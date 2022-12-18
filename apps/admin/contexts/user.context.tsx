import {
	createContext,
	useContext,
	useState,
	useEffect,
	Dispatch,
	SetStateAction,
	FC,
} from "react";

export const UserContextImpl = createContext<UserContext>(null!);

export interface UserContext {
	user?: UserDocument;
	setUser: Dispatch<SetStateAction<UserDocument>>;
}

export function useUser() {
	return useContext(UserContextImpl);
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
	const [user, setUser] = useState<UserDocument>({ loggedIn: null });
	useEffect(() => {
		// example for verifying jwt
		async function verifyJwt() {
			try {
				const res = await fetch("http://localhost:8000/auth/login", {
					credentials: "include",
				});
				if (!res || !res.ok || res.status >= 400) {
					setUser({ loggedIn: false });
					return;
				}
				const data = await res.json();
				if (!data) {
					setUser({ loggedIn: false });
					return;
				}
				setUser({ ...data });
			} catch (err) {
				if (err instanceof Error) {
					console.error(err.message);
				}
				setUser({ loggedIn: false });
				return;
			}
		}
		// verifyJwt();
	}, []);

	return (
		<UserContextImpl.Provider value={{ user, setUser }}>
			{children}
		</UserContextImpl.Provider>
	);
};

interface UserDocument {
	loggedIn: boolean | null;
	username?: string;
}

interface UserProviderProps {
	children: React.ReactNode;
}
