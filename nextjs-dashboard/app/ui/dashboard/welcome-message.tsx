import { auth } from '@/auth';

export default async function WelcomeMessage() {

    const session = await auth()

    if (!session) {
        return <><span>Welcome!</span></>
    }
    return (
        <>
            {session.user &&
                <span>Welcome, {session.user.name}</span>
            }
        </>
    )
}