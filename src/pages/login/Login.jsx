import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";


const Login = () => {

    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault()
        const form = e.target;
        const phone = form.phone.value;
        const pin = form.pin.value;

        const userInfo = { phone, pin };
        console.log(userInfo)

        if (pin.length !== 5) {
            return toast.error("PIN Must be 5 digit");
        }

        const res = await axiosPublic.post('/login/api/create', userInfo)
        console.log(res?.data?.status)
        if (res?.data?.status === 200) {
            toast.success("Successfully Login");
            localStorage.setItem('userInfo', JSON.stringify(userInfo))
            // current user thakle token generate korbo

            const currentUser = JSON.parse(localStorage.getItem('userInfo'));
            console.log(currentUser)
            if (currentUser) {
                const userInfo = { email: currentUser.email };
                axiosPublic.post("/jwt", userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem("access-token", res.data.token)
                        }
                    })
            }
            return navigate("/")
        }
        else {
            return toast.error("Wrong Credentials");
        }


    }
    return (
        <>
            <div>
                <div className="mx-auto w-full max-w-md space-y-4 rounded-lg border bg-white p-7 shadow-lg sm:p-10 dark:border-zinc-700 dark:bg-zinc-900">
                    <h1 className="text-3xl font-semibold text-center">Please Login Now</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2 text-sm">
                        <label htmlFor="phone" className="block text-zinc-700 dark:text-zinc-300 font-medium">
                            Phone or Email
                        </label>
                        <input
                            className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus-visible:outline-none dark:border-zinc-700"
                            id="phone"
                            placeholder="Enter Your Phone/Email"
                            name="phone"
                            type="text"

                        />
                    </div>
                        <div className="space-y-2 text-sm">
                            <label htmlFor="password" className="block text-zinc-700 dark:text-zinc-300 font-medium">
                                PIN
                            </label>
                            <input
                                className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus-visible:outline-none dark:border-zinc-700"
                                id="pin"
                                placeholder="Enter Your PIN"
                                name="pin"
                                type="number"
                                required
                            />
                        </div>
                        <div className='flex justify-end w-full'>
                            <button className="rounded-md bg-primary px-4 py-2 text-white  hover:bg-primaryGray">Login</button>
                        </div>
                    </form>
                    <p className="text-center text-sm">
                        Already have an account?
                        <a href="/register" className="font-semibold text-primary">
                            Login
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Login;