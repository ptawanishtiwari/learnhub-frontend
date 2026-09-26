import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API = "http://localhost:8080";

function CourseLearning() {

    const { courseId } = useParams();
    const navigate = useNavigate();

    const [course, setCourse] = useState(null);
    const [lectures, setLectures] = useState([]);
    const [selectedLecture, setSelectedLecture] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const loadCourseData = async () => {

            try {

                setLoading(true);
                setError("");

                const [courseResponse, lectureResponse] =
                    await Promise.all([
                        fetch(`${API}/course/${courseId}`),
                        fetch(`${API}/lecture/course/${courseId}`)
                    ]);

                if (!courseResponse.ok) {
                    throw new Error("Unable to load course details");
                }

                if (!lectureResponse.ok) {
                    throw new Error("Unable to load lectures");
                }

                const courseData = await courseResponse.json();
                const lectureData = await lectureResponse.json();

                const sortedLectures = Array.isArray(lectureData)
                    ? lectureData.sort(
                        (a, b) =>
                            Number(a.lectureOrder || 0) -
                            Number(b.lectureOrder || 0)
                    )
                    : [];

                setCourse(courseData);
                setLectures(sortedLectures);

                if (sortedLectures.length > 0) {
                    setSelectedLecture(sortedLectures[0]);
                }

            } catch (err) {

                console.error("Course Learning Error:", err);

                setError(
                    err.message ||
                    "Unable to load course"
                );

            } finally {

                setLoading(false);

            }
        };

        loadCourseData();

    }, [courseId]);


    const getVideoUrl = (videoUrl) => {

        if (!videoUrl) {
            return "";
        }

        if (videoUrl.startsWith("http")) {
            return videoUrl;
        }

        return `${API}${videoUrl}`;
    };


    const selectLecture = (lecture) => {
        setSelectedLecture(lecture);
    };


    const goToPreviousLecture = () => {

        if (!selectedLecture) return;

        const currentIndex =
            lectures.findIndex(
                lecture =>
                    lecture.id === selectedLecture.id
            );

        if (currentIndex > 0) {
            setSelectedLecture(
                lectures[currentIndex - 1]
            );
        }
    };


    const goToNextLecture = () => {

        if (!selectedLecture) return;

        const currentIndex =
            lectures.findIndex(
                lecture =>
                    lecture.id === selectedLecture.id
            );

        if (
            currentIndex !== -1 &&
            currentIndex < lectures.length - 1
        ) {
            setSelectedLecture(
                lectures[currentIndex + 1]
            );
        }
    };


    if (loading) {

        return (
            <div
                style={{
                    minHeight: "100vh",
                    background: "#050507",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >

                <div className="text-center">

                    <div
                        className="spinner-border"
                        style={{
                            color: "#8b5cf6",
                            width: "3rem",
                            height: "3rem"
                        }}
                    ></div>

                    <p
                        className="mt-3"
                        style={{
                            color: "#a1a1aa"
                        }}
                    >
                        Loading course...
                    </p>

                </div>

            </div>
        );
    }


    if (error) {

        return (
            <div
                style={{
                    minHeight: "100vh",
                    background: "#050507",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px"
                }}
            >

                <div
                    className="text-center"
                    style={{
                        maxWidth: "500px"
                    }}
                >

                    <div
                        style={{
                            width: "70px",
                            height: "70px",
                            borderRadius: "50%",
                            background: "rgba(239,68,68,0.15)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto 20px"
                        }}
                    >
                        <i
                            className="bi bi-exclamation-triangle"
                            style={{
                                fontSize: "30px",
                                color: "#ef4444"
                            }}
                        ></i>
                    </div>

                    <h4>
                        Unable to Load Course
                    </h4>

                    <p
                        style={{
                            color: "#a1a1aa"
                        }}
                    >
                        {error}
                    </p>

                    <button
                        className="btn"
                        onClick={() =>
                            navigate("/dashboard")
                        }
                        style={{
                            background:
                                "linear-gradient(135deg,#7c3aed,#a78bfa)",
                            color: "#ffffff",
                            border: "none",
                            borderRadius: "10px",
                            padding: "10px 20px"
                        }}
                    >
                        <i className="bi bi-arrow-left me-2"></i>
                        Back to Dashboard
                    </button>

                </div>

            </div>
        );
    }


    return (

        <div
            style={{
                minHeight: "100vh",
                background: "#050507",
                color: "#ffffff"
            }}
        >

            {/* TOP NAVBAR */}

            <nav
                style={{
                    height: "70px",
                    background: "#0b0b10",
                    borderBottom:
                        "1px solid rgba(139,92,246,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 30px",
                    position: "sticky",
                    top: 0,
                    zIndex: 100
                }}
            >

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px"
                    }}
                >

                    <div
                        style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "12px",
                            background:
                                "linear-gradient(135deg,#7c3aed,#a78bfa)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <i
                            className="bi bi-mortarboard-fill"
                            style={{
                                fontSize: "20px"
                            }}
                        ></i>
                    </div>

                    <div>

                        <div
                            style={{
                                fontWeight: "700",
                                fontSize: "18px"
                            }}
                        >
                            LearnHub
                        </div>

                        <div
                            style={{
                                fontSize: "11px",
                                color: "#8b5cf6"
                            }}
                        >
                            LEARNING CENTER
                        </div>

                    </div>

                </div>


                <button
                    className="btn"
                    onClick={() =>
                        navigate("/dashboard")
                    }
                    style={{
                        border:
                            "1px solid rgba(139,92,246,0.4)",
                        color: "#c4b5fd",
                        background:
                            "rgba(139,92,246,0.08)",
                        borderRadius: "10px",
                        padding: "8px 16px"
                    }}
                >
                    <i className="bi bi-arrow-left me-2"></i>
                    Dashboard
                </button>

            </nav>


            {/* MAIN CONTENT */}

            <div
                className="container-fluid"
                style={{
                    padding: "30px"
                }}
            >

                {/* COURSE HEADER */}

                <div
                    style={{
                        marginBottom: "25px"
                    }}
                >

                    <div
                        style={{
                            color: "#a78bfa",
                            fontSize: "13px",
                            fontWeight: "600",
                            marginBottom: "8px"
                        }}
                    >
                        COURSE LEARNING
                    </div>

                    <h2
                        style={{
                            fontWeight: "700",
                            marginBottom: "8px"
                        }}
                    >
                        {course?.title}
                    </h2>

                    <p
                        style={{
                            color: "#a1a1aa",
                            maxWidth: "850px",
                            marginBottom: "0"
                        }}
                    >
                        {course?.description}
                    </p>

                </div>


                {/* MAIN GRID */}

                <div className="row g-4">

                    {/* VIDEO SECTION */}

                    <div className="col-lg-8">

                        <div
                            style={{
                                background: "#0b0b10",
                                border:
                                    "1px solid rgba(139,92,246,0.18)",
                                borderRadius: "16px",
                                overflow: "hidden"
                            }}
                        >

                            {selectedLecture?.videoUrl ? (

                                <video
                                    key={selectedLecture.id}
                                    controls
                                    style={{
                                        display: "block",
                                        width: "100%",
                                        aspectRatio: "16/9",
                                        background: "#000"
                                    }}
                                >

                                    <source
                                        src={getVideoUrl(
                                            selectedLecture.videoUrl
                                        )}
                                        type="video/mp4"
                                    />

                                    Your browser does not support
                                    the video tag.

                                </video>

                            ) : (

                                <div
                                    style={{
                                        aspectRatio: "16/9",
                                        background:
                                            "linear-gradient(135deg,#0b0b10,#17121f)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexDirection: "column"
                                    }}
                                >

                                    <i
                                        className="bi bi-camera-video-off"
                                        style={{
                                            fontSize: "50px",
                                            color: "#71717a",
                                            marginBottom: "15px"
                                        }}
                                    ></i>

                                    <h5>
                                        Video Not Available
                                    </h5>

                                    <p
                                        style={{
                                            color: "#71717a"
                                        }}
                                    >
                                        This lecture does not have
                                        a video uploaded yet.
                                    </p>

                                </div>

                            )}


                            {/* VIDEO INFO */}

                            <div
                                style={{
                                    padding: "22px"
                                }}
                            >

                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent:
                                            "space-between",
                                        alignItems: "center",
                                        gap: "15px",
                                        flexWrap: "wrap"
                                    }}
                                >

                                    <div>

                                        <div
                                            style={{
                                                fontSize: "12px",
                                                color: "#8b5cf6",
                                                fontWeight: "600",
                                                marginBottom: "5px"
                                            }}
                                        >
                                            LECTURE{" "}
                                            {selectedLecture?.lectureOrder}
                                        </div>

                                        <h4
                                            style={{
                                                marginBottom: "5px",
                                                fontWeight: "600"
                                            }}
                                        >
                                            {selectedLecture?.title}
                                        </h4>

                                        <span
                                            style={{
                                                color: "#71717a",
                                                fontSize: "13px"
                                            }}
                                        >
                                            <i className="bi bi-clock me-1"></i>
                                            {selectedLecture?.duration ||
                                                "Duration not available"}
                                        </span>

                                    </div>


                                    {selectedLecture?.preview && (

                                        <span
                                            style={{
                                                background:
                                                    "rgba(139,92,246,0.15)",
                                                color: "#c4b5fd",
                                                padding:
                                                    "6px 12px",
                                                borderRadius:
                                                    "20px",
                                                fontSize: "12px",
                                                fontWeight: "600"
                                            }}
                                        >
                                            <i className="bi bi-eye me-1"></i>
                                            Preview
                                        </span>

                                    )}

                                </div>


                                {selectedLecture?.description && (

                                    <p
                                        style={{
                                            color: "#a1a1aa",
                                            marginTop: "15px",
                                            marginBottom: "20px",
                                            lineHeight: "1.7"
                                        }}
                                    >
                                        {selectedLecture.description}
                                    </p>

                                )}


                                {/* PREVIOUS NEXT */}

                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent:
                                            "space-between",
                                        gap: "10px"
                                    }}
                                >

                                    <button
                                        className="btn"
                                        onClick={
                                            goToPreviousLecture
                                        }
                                        disabled={
                                            lectures.findIndex(
                                                lecture =>
                                                    lecture.id ===
                                                    selectedLecture?.id
                                            ) <= 0
                                        }
                                        style={{
                                            border:
                                                "1px solid #27272a",
                                            color: "#d4d4d8",
                                            background:
                                                "#111116",
                                            borderRadius: "9px"
                                        }}
                                    >
                                        <i className="bi bi-chevron-left me-1"></i>
                                        Previous
                                    </button>


                                    <button
                                        className="btn"
                                        onClick={
                                            goToNextLecture
                                        }
                                        disabled={
                                            lectures.findIndex(
                                                lecture =>
                                                    lecture.id ===
                                                    selectedLecture?.id
                                            ) >=
                                            lectures.length - 1
                                        }
                                        style={{
                                            background:
                                                "linear-gradient(135deg,#7c3aed,#a78bfa)",
                                            color: "#ffffff",
                                            border: "none",
                                            borderRadius: "9px"
                                        }}
                                    >
                                        Next Lecture
                                        <i className="bi bi-chevron-right ms-1"></i>
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* LECTURE SIDEBAR */}

                    <div className="col-lg-4">

                        <div
                            style={{
                                background: "#0b0b10",
                                border:
                                    "1px solid rgba(139,92,246,0.18)",
                                borderRadius: "16px",
                                overflow: "hidden",
                                position: "sticky",
                                top: "95px"
                            }}
                        >

                            {/* SIDEBAR HEADER */}

                            <div
                                style={{
                                    padding: "20px",
                                    borderBottom:
                                        "1px solid #1f1f26"
                                }}
                            >

                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent:
                                            "space-between",
                                        alignItems: "center"
                                    }}
                                >

                                    <div>

                                        <h5
                                            style={{
                                                marginBottom: "4px",
                                                fontWeight: "700"
                                            }}
                                        >
                                            Course Content
                                        </h5>

                                        <span
                                            style={{
                                                color: "#71717a",
                                                fontSize: "12px"
                                            }}
                                        >
                                            {lectures.length}{" "}
                                            {lectures.length === 1
                                                ? "Lecture"
                                                : "Lectures"}
                                        </span>

                                    </div>

                                    <div
                                        style={{
                                            width: "38px",
                                            height: "38px",
                                            borderRadius: "10px",
                                            background:
                                                "rgba(139,92,246,0.12)",
                                            color: "#a78bfa",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}
                                    >
                                        <i className="bi bi-list-ul"></i>
                                    </div>

                                </div>

                            </div>


                            {/* LECTURES */}

                            <div
                                style={{
                                    maxHeight: "600px",
                                    overflowY: "auto"
                                }}
                            >

                                {lectures.length === 0 ? (

                                    <div
                                        className="text-center"
                                        style={{
                                            padding: "40px 20px"
                                        }}
                                    >

                                        <i
                                            className="bi bi-collection-play"
                                            style={{
                                                fontSize: "40px",
                                                color: "#52525b"
                                            }}
                                        ></i>

                                        <p
                                            style={{
                                                color: "#71717a",
                                                marginTop: "12px",
                                                marginBottom: "0"
                                            }}
                                        >
                                            No lectures uploaded yet.
                                        </p>

                                    </div>

                                ) : (

                                    lectures.map(
                                        (lecture, index) => {

                                            const isSelected =
                                                selectedLecture?.id ===
                                                lecture.id;

                                            return (

                                                <div
                                                    key={lecture.id}
                                                    onClick={() =>
                                                        selectLecture(
                                                            lecture
                                                        )
                                                    }
                                                    style={{
                                                        padding:
                                                            "15px 18px",
                                                        cursor: "pointer",
                                                        borderBottom:
                                                            "1px solid #18181d",
                                                        background:
                                                            isSelected
                                                                ? "rgba(124,58,237,0.14)"
                                                                : "transparent",
                                                        borderLeft:
                                                            isSelected
                                                                ? "3px solid #8b5cf6"
                                                                : "3px solid transparent",
                                                        transition:
                                                            "all 0.2s ease"
                                                    }}
                                                >

                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            gap: "12px",
                                                            alignItems:
                                                                "center"
                                                        }}
                                                    >

                                                        {/* NUMBER */}

                                                        <div
                                                            style={{
                                                                minWidth:
                                                                    "36px",
                                                                width:
                                                                    "36px",
                                                                height:
                                                                    "36px",
                                                                borderRadius:
                                                                    "10px",
                                                                background:
                                                                    isSelected
                                                                        ? "linear-gradient(135deg,#7c3aed,#a78bfa)"
                                                                        : "#18181d",
                                                                color:
                                                                    isSelected
                                                                        ? "#fff"
                                                                        : "#a1a1aa",
                                                                display:
                                                                    "flex",
                                                                alignItems:
                                                                    "center",
                                                                justifyContent:
                                                                    "center",
                                                                fontWeight:
                                                                    "600",
                                                                fontSize:
                                                                    "13px"
                                                            }}
                                                        >
                                                            {lecture.lectureOrder ||
                                                                index + 1}
                                                        </div>


                                                        {/* DETAILS */}

                                                        <div
                                                            style={{
                                                                minWidth: 0,
                                                                flex: 1
                                                            }}
                                                        >

                                                            <div
                                                                style={{
                                                                    fontSize:
                                                                        "14px",
                                                                    fontWeight:
                                                                        "600",
                                                                    color:
                                                                        isSelected
                                                                            ? "#ffffff"
                                                                            : "#d4d4d8",
                                                                    whiteSpace:
                                                                        "nowrap",
                                                                    overflow:
                                                                        "hidden",
                                                                    textOverflow:
                                                                        "ellipsis"
                                                                }}
                                                            >
                                                                {lecture.title}
                                                            </div>

                                                            <div
                                                                style={{
                                                                    marginTop:
                                                                        "5px",
                                                                    display:
                                                                        "flex",
                                                                    gap: "10px",
                                                                    alignItems:
                                                                        "center",
                                                                    fontSize:
                                                                        "11px",
                                                                    color:
                                                                        "#71717a"
                                                                }}
                                                            >

                                                                <span>
                                                                    <i className="bi bi-clock me-1"></i>
                                                                    {lecture.duration ||
                                                                        "N/A"}
                                                                </span>

                                                                {lecture.preview && (

                                                                    <span
                                                                        style={{
                                                                            color:
                                                                                "#a78bfa"
                                                                        }}
                                                                    >
                                                                        Preview
                                                                    </span>

                                                                )}

                                                            </div>

                                                        </div>


                                                        {/* PLAY ICON */}

                                                        <i
                                                            className={
                                                                isSelected
                                                                    ? "bi bi-play-circle-fill"
                                                                    : "bi bi-play-circle"
                                                            }
                                                            style={{
                                                                color:
                                                                    isSelected
                                                                        ? "#a78bfa"
                                                                        : "#52525b",
                                                                fontSize:
                                                                    "20px"
                                                            }}
                                                        ></i>

                                                    </div>

                                                </div>

                                            );

                                        }
                                    )

                                )}

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default CourseLearning;