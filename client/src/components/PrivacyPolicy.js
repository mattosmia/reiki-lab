import React from 'react';
import { Link } from 'react-router-dom';

import ContentPage from './_ContentPage';
import TextWithButton from './_TextWithButton';
import ContactForm from './_ContactForm';


const contentCopy = <>
					<p>Effective date: April 22, 2020</p>
                        <p>Reiki Lab App ("us", "we", or "our") operates the https://reikilabdublin.com/ website and the Reiki Lab App mobile application (the "Service").</p>
                        <p>This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data. Our Privacy Policy  for Reiki Lab App is created with the help of the <a href="https://www.freeprivacypolicy.com/free-privacy-policy-generator.php" target="_blank" rel="noopener noreferrer">Free Privacy Policy Generator</a>.</p>
                        <p>We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, terms used in this Privacy Policy have the same meanings as in our Terms and Conditions.</p>

                        <p>Information Collection And Use</p>
                        <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>
                        <p>Types of Data Collected</p>
                        
                        <p>Personal Data</p>
                        
                        <p>While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to: Email address, Full Name, DOB, Nationality and Country of Residence</p><p>Cookies and Usage Data</p>
                        
                        
                        <p>Usage Data</p>
                        
                        <p>We may also collect information that your browser sends whenever you visit our Service or when you access the Service by or through a mobile device ("Usage Data").</p>
                        <p>This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</p>
                        <p>When you access the Service by or through a mobile device, this Usage Data may include information such as the type of mobile device you use, your mobile device unique ID, the IP address of your mobile device, your mobile operating system, the type of mobile Internet browser you use, unique device identifiers and other diagnostic data.</p>
                        
                        <p>Tracking & Cookies Data</p>
                        <p>We use cookies and similar tracking technologies to track the activity on our Service and hold certain information.</p>
                        <p>Cookies are files with small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. Tracking technologies also used are beacons, tags, and scripts to collect and track information and to improve and analyze our Service.</p>
                        <p>You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.</p>
                        <p>Examples of Cookies we use:</p>
                            <p><strong>Session Cookies.</strong> We use Session Cookies to operate our Service.</p>
                            <p><strong>Preference Cookies.</strong> We use Preference Cookies to remember your preferences and various settings.</p>
                            <p><strong>Security Cookies.</strong> We use Security Cookies for security purposes.</p>
                        
                        
                        <p>Use of Data</p>
                            
                        <p>Reiki Lab uses the collected data for various purposes:</p>    
                            <p>To provide and maintain the Service</p>
                            <p>To notify you about changes to our Service</p>
                            <p>To allow you to participate in interactive features of our Service when you choose to do so</p>
                            <p>To provide customer care and support</p>
                            <p>To provide analysis or valuable information so that we can improve the Service</p>
                            <p>To monitor the usage of the Service</p>
                            <p>To detect, prevent and address technical issues</p>
                        
                        <p>Transfer Of Data</p>
                        <p>Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction.</p>
                        <p>If you are located outside Ireland and choose to provide information to us, please note that we transfer the data, including Personal Data, to Ireland and process it there.</p>
                        <p>Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.</p>
                        <p>Reiki Lab App will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy and no transfer of your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of your data and other personal information.</p>
                        
                        <p>Disclosure Of Data</p>
                        
                        <p>Legal Requirements</p>
                        <p>Reiki Lab App may disclose your Personal Data in the good faith belief that such action is necessary to:</p>
                            <p>To comply with a legal obligation</p>
                            <p>To protect and defend the rights or property of Reiki Lab App</p>
                            <p>To prevent or investigate possible wrongdoing in connection with the Service</p>
                            <p>To protect the personal safety of users of the Service or the public</p>
                            <p>To protect against legal liability</p>
                        
                        <p>Security Of Data</p>
                        <p>The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>
                        
                        <p>Service Providers</p>
                        <p>We may employ third party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used.</p>
                        <p>These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</p>
                        
                        
                        
                        <p>Links To Other Sites</p>
                        <p>Our Service may contain links to other sites that are not operated by us. If you click on a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.</p>
                        <p>We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</p>
                        
                        
                        <p>Children's Privacy</p>
                        <p>Our Service does not address anyone under the age of 18 ("Children").</p>
                        <p>We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware that your Children has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers.</p>
                        
                        
                        <p>Changes To This Privacy Policy</p>
                        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
                        <p>We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the "effective date" at the top of this Privacy Policy.</p>
                        <p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
                        
                        
                        <p>Contact Us</p>
                        <p>If you have any questions about this Privacy Policy, please contact us:</p>
                        <p>By sending an email to <a href="mailto:reikilabdublin@gmail.com">reikilabdublin@gmail.com</a></p>
                        <p>By visiting this page on our website: <a href="/contact">Contact Us</a></p>

</>;


function PrivacyPolicy() {
	return (
		<>
			<ContentPage heading="Privacy Policy" subheading="Read carefully" content={contentCopy} />
			<TextWithButton />
			<ContactForm />
		</>
	);
}

export default PrivacyPolicy;
