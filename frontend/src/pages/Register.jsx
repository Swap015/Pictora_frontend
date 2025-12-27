import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const cardRef = useRef(null);
    const titleRef = useRef(null);
    const inputRefs = useRef([]);
    const btnRef = useRef(null);
    const navigate = useNavigate();
    const paraRef = useRef(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    useEffect(() => {

        const tl = gsap.timeline();

        tl.from(cardRef.current, {
            scale: 0.8,
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
            .from(inputRefs.current.filter(ref => ref !== null),
                {
                    y: -20,
                    opacity: 0,
                    stagger: 0.15,
                    duration: 0.5,
                    clearProps: "all"
                },
                "-=0.3")
            .from(
                btnRef.current,
                {
                    y: -20,
                    scale: 0.9,
                    opacity: 0,
                    duration: 0.4
                },
                "-=0.2")
            .from(paraRef.current, {
                y: - 20,
                opacity: 0,
                stagger: 0.15,
                duration: 0.5,
                clearProps: "all"
            })


    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async () => {
        if (!formData.name || !formData.email || !formData.password) {
            toast.error("All fields are required.");
            return;
        }

        if (formData.password.length < 5) {
            toast.error("Password must be at least 5 characters.");
            return;
        }

        if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            toast.error("Invalid email format.");
            return;
        }

        try {
            await axios.post("http://localhost:8000/api/users/register", formData);
            toast.success("Registration successful.");

            setTimeout(() => {
                navigate("/login");
            }, 2000);

        }
        catch {
            toast.error("Something went wrong. Please try again.");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-purple-900">

            <div
                ref={cardRef}
                className="w-96 p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
            >

                <h2
                    ref={titleRef}
                    className="text-3xl font-bold text-center text-white mb-6"
                >
                    Create Account 🔥
                </h2>

                <form className="space-y-4">

                    <input
                        ref={(el) => (inputRefs.current[0] = el)}
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/20 text-white border border-white/70  placeholder-white/60 outline-none focus:ring-2 focus:ring-purple-500 transition"
                    />

                    <input
                        ref={(el) => (inputRefs.current[1] = el)}
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/20 text-white border border-white/70 placeholder-white/60 outline-none focus:ring-2 focus:ring-purple-500 transition "
                    />

                    <input
                        ref={(el) => (inputRefs.current[2] = el)}
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/20 text-white border border-white/70 placeholder-white/60 outline-none focus:ring-2 focus:ring-purple-500 transition "
                    />

                    <button
                        ref={btnRef}
                        type="button"
                        onClick={handleRegister}
                        onMouseEnter={() =>
                            gsap.to(btnRef.current, { scale: 1.05, duration: 0.2 })
                        }
                        onMouseLeave={() =>
                            gsap.to(btnRef.current, { scale: 1, duration: 0.2 })
                        }
                        className="w-full mt-4 py-2 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 text-white font-semibold shadow-lg"
                    >
                        Register
                    </button>
                </form>

                <p ref={paraRef} className="text-base text-center text-white/70 mt-6">
                    Already have an account?{" "}
                    <span className="text-purple-400 cursor-pointer hover:underline" onClick={() => navigate("/login")}>
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Register;
