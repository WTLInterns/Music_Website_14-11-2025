"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaPlayCircle, FaRegBookmark, FaStar, FaCheckCircle, FaClock, FaUsers } from "react-icons/fa";
import Image from "next/image";
import { getCurrentUser, getUserPurchases } from "@/lib/auth";

interface BackendCourse {
  courseId: string;
  courseName: string;
  details: string;
  courseImageUrl: string;
  price: string;
}

type BackendUserProfile = {
  name?: string;
  email?: string;
  profile?: string;
};

export default function MyCoursesPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<BackendCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [courseProgress, setCourseProgress] = useState<Record<string, number>>({});
  const [courseWatchedSeconds, setCourseWatchedSeconds] = useState<Record<string, number>>({});
  const [user, setUser] = useState<any>(null);
  const [backendUser, setBackendUser] = useState<BackendUserProfile | null>(null);
  const [completedCourses, setCompletedCourses] = useState<number>(0);
  const [totalHours, setTotalHours] = useState<number>(0);
  const [certificates, setCertificates] = useState<number>(0);

  const formatHours = (seconds: number) => {
    const hrs = seconds / 3600;
    const rounded = Math.round(hrs * 10) / 10;
    return rounded;
  };

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push("/login");
      return;
    }
    
    setUser(currentUser);

    const fetchUserProfile = async () => {
      try {
        if (!currentUser.email) return;
        const res = await fetch(
          `https://api.ddhavalmulay.com/api/users/by-email?email=${encodeURIComponent(currentUser.email)}`
        );
        if (!res.ok) return;
        const data = (await res.json()) as BackendUserProfile;
        setBackendUser(data);
      } catch {
        // ignore
      }
    };

    fetchUserProfile();

    const purchased = getUserPurchases(currentUser.id);
    if (!purchased.length) {
      setCourses([]);
      setLoading(false);
      return;
    }

    const fetchCourses = async () => {
      try {
        setLoading(true);
        const results: BackendCourse[] = [];

        for (const courseId of purchased) {
          try {
            const res = await fetch(`https://api.ddhavalmulay.com/course/get-course/${courseId}`);
            if (!res.ok) continue;
            const data = (await res.json()) as BackendCourse;
            results.push(data);
          } catch {
            // ignore individual fetch errors
          }
        }

        setCourses(results);
      } catch {
        setError("Failed to load your courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [router]);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) return;
    if (!courses.length) return;

    const fetchProgress = async () => {
      const progressMap: Record<string, number> = {};
      const watchedMap: Record<string, number> = {};
      let completed = 0;
      let watchedSecondsTotal = 0;
      let certs = 0;

      await Promise.all(
        courses.map(async (c) => {
          try {
            const res = await fetch(
              `https://api.ddhavalmulay.com/api/video-progress/course-time-completion?email=${encodeURIComponent(
                currentUser.email
              )}&courseId=${encodeURIComponent(c.courseId)}`
            );
            if (!res.ok) return;
            const data = (await res.json()) as {
              completionPercentage?: number;
              watchedSeconds?: number;
              completed?: boolean;
            };
            const pct = typeof data.completionPercentage === "number" ? data.completionPercentage : 0;
            const progress = Number.isFinite(pct) ? Math.max(0, Math.min(100, Math.round(pct))) : 0;
            progressMap[c.courseId] = progress;

            const watchedSeconds = typeof data.watchedSeconds === "number" && Number.isFinite(data.watchedSeconds)
              ? Math.max(0, data.watchedSeconds)
              : 0;
            watchedMap[c.courseId] = watchedSeconds;
            watchedSecondsTotal += watchedSeconds;
            
            // Calculate stats
            if (progress >= 100 || Boolean(data.completed)) {
              completed++;
              certs++;
            }
          } catch {
            // ignore
          }
        })
      );

      setCourseProgress(progressMap);
      setCourseWatchedSeconds(watchedMap);
      setCompletedCourses(completed);
      setTotalHours(formatHours(watchedSecondsTotal));
      setCertificates(certs);
    };

    fetchProgress();
  }, [courses]);

  const avgProgress = courses.length > 0
    ? Math.round(Object.values(courseProgress).reduce((a, b) => a + b, 0) / courses.length)
    : 0;

  const displayName = backendUser?.name || user?.name || "User";
  const displayEmail = backendUser?.email || user?.email || "";
  const displayAvatar = backendUser?.profile || user?.profile || "";

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-oswald">Loading your courses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full mx-4 text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2 font-oswald">Something went wrong</h2>
          <p className="text-gray-600 mb-6 font-oswald">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300 font-oswald"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  if (!courses.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full mx-4 text-center">
          <div className="text-blue-500 text-5xl mb-4">📚</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2 font-oswald">No courses yet</h2>
          <p className="text-gray-600 mb-6 font-oswald">You haven&#39;t enrolled in any courses yet. Start learning today!</p>
          <button
            onClick={() => router.push("/courses")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300 font-oswald"
          >
            Browse Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                {displayAvatar ? (
                  <Image
                    src={displayAvatar}
                    alt={displayName}
                    width={56}
                    height={56}
                    className="w-14 h-14 rounded-2xl object-cover border border-gray-200 shadow"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white text-xl font-black shadow">
                    {displayName
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")
                      .toUpperCase()
                      .substring(0, 2) || "U"}
                  </div>
                )}

                <div>
                  <div className="text-xl md:text-2xl font-black text-gray-900 font-oswald">
                    My Learning
                  </div>
                  <div className="text-sm text-gray-600 font-oswald">
                    {displayName}{displayEmail ? ` • ${displayEmail}` : ""}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => router.push("/courses")}
                  className="px-4 py-2 rounded-xl bg-gray-900 text-white font-bold font-oswald hover:bg-black transition-colors"
                >
                  Explore Courses
                </button>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-purple-50 to-white p-4">
                <div className="text-sm text-gray-600 font-oswald">Courses Enrolled</div>
                <div className="mt-1 text-2xl font-black text-gray-900 font-oswald">{courses.length}</div>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-amber-50 to-white p-4">
                <div className="text-sm text-gray-600 font-oswald">Hours Learned</div>
                <div className="mt-1 text-2xl font-black text-gray-900 font-oswald">{totalHours}</div>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-emerald-50 to-white p-4">
                <div className="text-sm text-gray-600 font-oswald">Certificates</div>
                <div className="mt-1 text-2xl font-black text-gray-900 font-oswald">{certificates}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <div className="text-lg font-black text-gray-900 font-oswald">My Courses</div>
                    <div className="text-sm text-gray-600 font-oswald">Continue where you left off</div>
                  </div>
                  <div className="text-sm font-oswald text-gray-700">
                    Avg progress: <span className="font-black text-gray-900">{avgProgress}%</span>
                  </div>
                </div>

                <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                  {courses.map((c) => {
                    const progress = courseProgress[c.courseId] ?? 0;
                    const hours = formatHours(courseWatchedSeconds[c.courseId] ?? 0);
                    const isCompleted = progress >= 100;

                    return (
                      <button
                        key={c.courseId}
                        onClick={() => router.push(`/watch?course=${encodeURIComponent(c.courseId)}&index=0`)}
                        className="text-left group rounded-2xl border border-gray-100 bg-white hover:shadow-lg hover:-translate-y-0.5 transition-all overflow-hidden"
                      >
                        <div className="h-36 w-full bg-gradient-to-r from-indigo-500 to-purple-600 relative overflow-hidden">
                          {c.courseImageUrl ? (
                            <Image src={c.courseImageUrl} alt={c.courseName} width={400} height={200} className="w-full h-full object-cover opacity-95 group-hover:opacity-100 transition-opacity" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <div className="text-white text-2xl font-black font-oswald">
                                {c.courseName?.substring(0, 2)?.toUpperCase() || "MK"}
                              </div>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                            <div className="text-white font-black font-oswald line-clamp-1">{c.courseName}</div>
                            {isCompleted ? (
                              <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/90 text-white font-bold">Completed</span>
                            ) : (
                              <span className="text-xs px-2 py-1 rounded-full bg-white/20 text-white font-bold">In Progress</span>
                            )}
                          </div>
                        </div>

                        <div className="p-4">
                          <div className="text-sm text-gray-600 font-oswald line-clamp-2">{c.details}</div>

                          <div className="mt-3 flex items-center justify-between text-xs text-gray-600 font-oswald">
                            <div className="flex items-center gap-2">
                              <FaStar className="text-yellow-400" />
                              <span>4.5</span>
                              <span className="text-gray-300">|</span>
                              {/* <FaUsers /> */}
                              {/* <span>12k</span> */}
                            </div>
                            <div className="flex items-center gap-2">
                              <FaClock />
                              <span>{hours}h</span>
                            </div>
                          </div>

                          <div className="mt-4">
                            <div className="flex items-center justify-between text-sm font-oswald">
                              <span className="text-gray-700">Progress</span>
                              <span className="font-black text-gray-900">{progress}%</span>
                            </div>
                            <div className="mt-2 w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                              <div
                                className="h-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          </div>

                          <div className="mt-4 flex items-center justify-between">
                            {/* <div className="text-gray-900 font-black font-oswald">₹{c.price}</div> */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 text-white font-bold font-oswald group-hover:bg-black transition-colors">
                              Continue
                              <span className="opacity-70">›</span>
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="text-lg font-black text-gray-900 font-oswald">Progress Overview</div>
                <div className="text-sm text-gray-600 font-oswald">A quick snapshot</div>

                <div className="mt-4 space-y-4">
                  <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600 font-oswald">Completed Courses</div>
                      <div className="text-lg font-black text-gray-900 font-oswald">{completedCourses}</div>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600 font-oswald">Active Courses</div>
                      <div className="text-lg font-black text-gray-900 font-oswald">{Math.max(0, courses.length - completedCourses)}</div>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600 font-oswald">Avg Progress</div>
                      <div className="text-lg font-black text-gray-900 font-oswald">{avgProgress}%</div>
                    </div>
                    <div className="mt-2 w-full bg-white rounded-full h-2 overflow-hidden border border-gray-100">
                      <div className="h-2 bg-gradient-to-r from-emerald-500 to-teal-500" style={{ width: `${avgProgress}%` }} />
                    </div>
                  </div>

                  <button
                    onClick={() => router.push("/courses")}
                    className="w-full px-4 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black font-oswald hover:from-purple-700 hover:to-pink-700 transition-colors"
                  >
                    Browse More Courses
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
