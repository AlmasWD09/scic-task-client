import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const Register = () => {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    
    const handleSubmit = async e => {
        e.preventDefault()
        const form = e.target;
        const name = form.username.value;
        const role = form.role.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const pin = form.pin.value;
        const status ="pending";
        const balance = 0;
        const userInfo = { name, email, phone, pin, role, status, balance };
        console.log(userInfo)


        if(pin.length !== 5){
            return toast.error("PIN Must be 5 digit");
        }

       const res = await axiosPublic.post('/users/api/create', userInfo)
       if(res.data.insertedId){
        toast.success("Successfully Registered");
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
         // user get by localStorage

         const currentUser = JSON.parse(localStorage.getItem('userInfo'));
         console.log(currentUser)
         if(currentUser){
            const userInfo= {email: currentUser.email};
            axiosPublic.post("/jwt", userInfo)
            .then(res => {
                if(res.data.token){
                    localStorage.setItem("access-token", res.data.token)
                }
            })
        }
        return navigate("/")
       }
       else{
        return toast.error("Email or Phone already have an exist");
       }
    }
    return (
        <>
        <div className="mx-auto w-full max-w-md space-y-4 rounded-lg border bg-white p-7 shadow-lg sm:p-10 dark:border-zinc-700 dark:bg-zinc-900">
            <h1 className="text-3xl font-semibold text-center">Please Register Now</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2 text-sm">
                    <label htmlFor="username" className="block text-zinc-700 dark:text-zinc-300 font-medium">
                        Username
                    </label>
                    <input
                        className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus-visible:outline-none dark:border-zinc-700"
                        id="username"
                        placeholder="Enter username"
                        name="username"
                        type="text"
                        required
                        
                    />
                </div>

                <div className='flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus-visible:outline-none dark:border-zinc-700'>
                <select name="role" className="select select-bordered w-full max-w-xs">
                    <option value="user" selected>User</option>
                    <option value="agent">Agent</option>
                    <option value="admin">Admin</option>
                </select>
                </div>

                <div className="space-y-2 text-sm">
                    <label htmlFor="phone" className="block text-zinc-700 dark:text-zinc-300 font-medium">
                        Phone Number
                    </label>
                    <input
                        className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus-visible:outline-none dark:border-zinc-700"
                        id="phone"
                        placeholder="Enter Your Phone"
                        name="phone"
                        type="number"
                        required
                    />
                </div>
                <div className="space-y-2 text-sm">
                    <label htmlFor="email" className="block text-zinc-700 dark:text-zinc-300 font-medium">
                        Email
                    </label>
                    <input
                        className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus-visible:outline-none dark:border-zinc-700"
                        id="email"
                        placeholder="Enter email"
                        name="email"
                        type="email"
                        required
                    />
                </div>
                <div className="space-y-2 text-sm">
                    <label htmlFor="password" className="block text-zinc-700 dark:text-zinc-300 font-medium">
                        PIN
                    </label>
                    <input
                        className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus-visible:outline-none dark:border-zinc-700"
                        id="pin"
                        placeholder="Enter New PIN"
                        name="pin"
                        type="number"
                        required
                    />
                </div>
                <div className='flex justify-end w-full'>
                <button className="rounded-md bg-primary px-4 py-2 text-white  hover:bg-primaryGray">Register</button>
                </div>
            </form>
            <p className="text-center text-sm">
                Don not have an account?
                <a href="/login" className="font-semibold text-primary">
                    Login
                </a>
            </p>
        </div>
    </>
    );
};

export default Register;