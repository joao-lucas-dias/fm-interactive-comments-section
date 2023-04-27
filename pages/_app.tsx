import store from "@/store/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Rubik } from "next/font/google";
import { Provider } from "react-redux";

const rubik = Rubik({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<style jsx global>
				{`
					html {
						font-family: ${rubik.style.fontFamily};
					}
				`}
			</style>
			<Component {...pageProps} />
		</Provider>
	);
}
