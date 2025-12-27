import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const cardRef = useRef(null);
    const titleRef = useRef(null);
    const inputRefs = useRef([]);
    const btnRef = useRef(null);
    const paraRef = useRef(null);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);


    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.from(cardRef.current, {
                scale: 0.85,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            })
                .from(
                    titleRef.current,
                    {
                        y: -20,
                        opacity: 0,
                        duration: 0.4
                    },
                    "-=0.3"
                )
                .from(
                    inputRefs.current.filter(Boolean),
                    {
                        y: 20,
                        opacity: 0,
                        stagger: 0.15,
                        duration: 0.5,
                        clearProps: "all"
                    },
                    "-=0.3"
                ).from(
                    btnRef.current,
                    {
                        scale: 0.9,
                        opacity: 0,
                        duration: 0.4,
                        clearProps: "all"
                    },
                    "-=0.2"
                ).from(paraRef.current, {
                    scale: 1,
                    opacity: 0,
                    duration: 0.6,
                    clearProps: "all"
                })

        });

        return () => ctx.revert();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        if (!formData.email || !formData.password) {
            toast.error("All fields are required");
            return;
        }

        if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            toast.error("Invalid email format");
            return;
        }

        try {
            setLoading(true);

            await axios.post(
                "http://localhost:8000/api/users/login",
                formData,
                { withCredentials: true }
            );

            toast.success("Login successful 🔥");

            setTimeout(() => {
                navigate("/");
            }, 1500);

        } catch (error) {
            toast.error(
                error.response?.data?.msg || "Login failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-purple-900">

            <div
                ref={cardRef}
                className="w-full max-w-sm p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
            >

                <h2
                    ref={titleRef}
                    className="text-3xl font-bold text-center text-white mb-6"
                >
                    Welcome Back 👋
                </h2>

                <form className="space-y-4">

                    <input
                        ref={(el) => (inputRefs.current[0] = el)}
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/20 text-white border border-white/60 placeholder-white/60 outline-none focus:ring-2 focus:ring-purple-500 transition"
                    />

                    <input
                        ref={(el) => (inputRefs.current[1] = el)}
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/20 text-white border border-white/60 placeholder-white/60 outline-none focus:ring-2 focus:ring-purple-500 transition"
                    />

                    <button
                        ref={btnRef}
                        type="button"
                        disabled={loading}
                        onClick={handleLogin}
                        onMouseEnter={() =>
                            gsap.to(btnRef.current, { scale: 1.05, duration: 0.2 })
                        }
                        onMouseLeave={() =>
                            gsap.to(btnRef.current, { scale: 1, duration: 0.2 })
                        }
                        className={`w-full mt-4 py-2 rounded-xl font-semibold shadow-lg transition
              ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-gradient-to-br from-purple-600 to-pink-600 text-white"}`}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p ref={paraRef} className="text-base text-center text-white/70 mt-6">
                    Don’t have an account?{" "}
                    <span
                        className="text-purple-400 cursor-pointer hover:underline"
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;
