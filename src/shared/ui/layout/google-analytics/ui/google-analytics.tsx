import Script from "next/script";

import { ENV } from "@/shared/config";

const GTM_ORIGIN = "https://www.googletagmanager.com";

/** GA4 через контейнер Google Tag Manager — только в продакшене и только если задан ID */
export const GoogleAnalytics = () => {
	const containerId = ENV.NEXT_PUBLIC_GTM_ID;

	if (!containerId || !ENV.IS_PRODUCTION) {
		return null;
	}

	return (
		<>
			<Script id="gtm-init" strategy="afterInteractive">
				{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='${GTM_ORIGIN}/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${containerId}');`}
			</Script>
			<noscript>
				<iframe
					title="Google Tag Manager"
					src={`${GTM_ORIGIN}/ns.html?id=${containerId}`}
					width={0}
					height={0}
					className="hidden"
				/>
			</noscript>
		</>
	);
};
