import { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';

const PrivacyPolicyPage: NextPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 text-slate-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/mm-trans.png"
                alt="MarkedMuse"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <span className="font-bold text-xl text-slate-100">MarkedMuse</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/#about" className="text-slate-300 hover:text-slate-100 transition-colors">About</Link>
              <Link href="/#communities" className="text-slate-300 hover:text-slate-100 transition-colors">Communities</Link>
              <Link href="/#contact" className="text-slate-300 hover:text-slate-100 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm rounded-lg p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-slate-300 bg-clip-text text-transparent">Privacy Policy</h1>
            
                        <div className="space-y-12 text-slate-300">
                          <p className="text-lg text-slate-200">Zahavat Group (the “Company”) respects the privacy of its online visitors and customers of its products and services (including, but not limited to Marked Muse Communities, XLR8tor Designs, or associated websites integrating with our services.) and complies with applicable laws for the protection of your privacy.</p>
                          
                          <LegalSection title="1. Definitions">
                            <p>Wherever we talk about Personal Data below ("Personal Data"), we mean any information that can either itself identify you as an individual ("Personally Identifying Information") or that can be connected to you indirectly by linking it to Personally Identifying Information, for example:</p>
                            <ul className="list-disc list-inside space-y-2 pl-4">
                              <li>your account registration information on our website and in our App;</li>
                              <li>when you request any support from us or report any problem to us;</li>
                              <li>information provided from using certain services or features;</li>
                              <li>information from completion of survey or questionnaire;</li>
                              <li>technical information, including the Internet protocol (IP) address used and your log-in information, browser, time zone setting, browser plug-in types, and versions, operating system, and platform;</li>
                              <li>details of any transactions, purchases, and payments you made;</li>
                              <li>your general interaction with the website, including the full Uniform Resource Locators (URLs), clickstream to, through, and from our site, products you viewed or searched for, page response times, download errors, length of visits to certain pages, page interaction information;</li>
                              <li>information received from third parties, such as business partners, sub-contractors, payment and delivery services, referrals by other users.</li>
                            </ul>
                            <p>The Company also processes anonymous data, aggregated or not, to analyze and produce statistics related to the habits, usage patterns, and demographics of customers as a group or as individuals. Such anonymous data does not allow the identification of the customers to which it relates. the Company may share anonymous data, aggregated or not, with third parties. Please be aware that the Company may choose to permit third parties to offer subscription and/or registration-based services through the Company's site. The Company shall not be responsible for any actions or policies of such third parties and you should check the applicable privacy policy of such party when providing personally identifiable information.</p>
                            <p>By using the Company's website, you signify your assent to the Company's privacy policy. If you do not agree to this policy, please do not use the Company's website(s).</p>
                          </LegalSection>
            
                          <LegalSection title="2. Why the Company Collects and Processes Data">
                            <p>The Company collects and processes Personal Data for the following reasons:</p>
                            <ul className="list-disc list-inside space-y-2 pl-4">
                              <li>performing our agreement with you to provide content and services, including providing, improving, and developing our services;</li>
                              <li>researching, designing, and launching new features or products;</li>
                              <li>providing you with alerts, updates, materials, or information about our services or other types of information that you requested or signed up to;</li>
                              <li>collecting overdue amounts;</li>
                              <li>responding or taking part in legal proceedings, including seeking professional advice, or for the legitimate and legal interests of the Company or a third party (e.g. the interests of our other customers);</li>
                              <li>compliance with legal obligations that we are subject to;</li>
                              <li>communicating with you and responding to your questions or requests;</li>
                              <li>purposes directly related or incidental to the above; or</li>
                              <li>where you have given consent to it.</li>
                            </ul>
                            <p>These reasons for collecting and processing Personal Data determine and limit what Personal Data we collect and how we use it (section 3. below), how long we store it (section 4. below), who has access to it (section 5. below) and what rights and other control mechanisms are available to you as a user (section 6. below).</p>
                          </LegalSection>
            
                          <LegalSection title="3. What Data We Collect and Process">
                            <SubSection title="3.1 Basic Account Data">
                              <p>When setting up an Account, the Company will collect your email address and country of residence. You are also required to choose a user name and a password. The provision of this information is necessary to register a User Account. You are responsible for keeping this password confidential. We ask you not to share a password with anyone.</p>
                              <p>During setup of your account, a number (the "ID") that is later used to reference your user account without directly exposing Personally-Identifying Information about you is automatically assigned.</p>
                            </SubSection>
                            <SubSection title="3.2 Transaction and Payment Data">
                              <p>In order to make a transaction online, you may need to provide payment data to the Company to enable the transaction. If you pay by credit card, you need to provide typical credit card information (name, address, credit card number, expiration date, and security code) to the Company, which the Company will process and transmit to the payment service provider of your choice to enable the transaction and perform anti-fraud checks. Likewise, the Company will receive data from your payment service provider for the same reasons.</p>
                            </SubSection>
                            <SubSection title="3.3 Other Data You Explicitly Submit">
                              <p>We will collect and process Personal Data whenever you explicitly provide it to us or send it as part of communication with others, e.g. in forums, chats, or when you provide feedback or other user-generated content. This data includes:</p>
                              <ul className="list-disc list-inside space-y-2 pl-4">
                                <li>Information that you post, comment or follow in any of our Content and Services;</li>
                                <li>Information sent through chat;</li>
                                <li>Information you provide when you request information or support from us or purchase Content and Services from us, including information necessary to process your orders with the relevant payment merchant or, in case of physical goods, shipping providers;</li>
                                <li>Information you provide to us when participating in competitions, contests, and tournaments or responding to surveys, e.g. your contact details.</li>
                              </ul>
                            </SubSection>
                            <SubSection title="3.4 Your Use of the Websites">
                              <p>We collect a variety of information through your general interaction with the websites, Content, and Services offered by us. Personal Data we collect may include, but is not limited to, browser and device information, data collected through automated electronic interactions, and application usage data. Likewise, we will track your process across your websites and applications to verify that you are not a bot and to optimize our services.</p>
                            </SubSection>
                            <SubSection title="3.5 Your Use of Services and other Subscriptions">
                              <p>In order to provide you with services, we need to collect, store and use various information about your activity in our Content and Services. "Content-Related Information" includes your ID, as well as information about your preferences, progress, time spent, as well as information about the device you are using, including what operating system you are using, device settings, unique device identifiers, and crash data.</p>
                            </SubSection>
                            <SubSection title="3.6 Tracking Data and Cookies">
                              <p>We use "Cookies", which are text files placed on your computer, to help us analyze how users use our services, and similar technologies (e.g. web beacons, pixels, ad tags, and device identifiers) to recognize you and/or your device(s) on, off and across different devices and our services, as well as to improve the services we are offering, to improve marketing, analytics or website functionality. The use of Cookies is standard on the internet. Although most web browsers automatically accept cookies, the decision of whether to accept or not is yours. You may adjust your browser settings to prevent the reception of cookies, or to provide notification whenever a cookie is sent to you. You may refuse the use of cookies by selecting the appropriate settings on your browser. However, please note that if you do this, you may not be able to access the full functionality of our websites. When you visit any of our services, our servers log your global IP address, which is a number that is automatically assigned to the network your computer is part of.</p>
                            </SubSection>
                            <SubSection title="3.7 Third Party Services">
                              <p>This website uses Google Analytics / Google Maps / Social Logins: Google, Twitch, or Apple / Spotify / Apple Music / Amazon Music / TikTok / YouTube / Instagram / Facebook / Meta Services ("Third Party Service"). Third-Party Service uses "cookies", which are text files placed on visitors' computers, to help the website operators analyze how visitors use the site. The information generated by the cookie about the visitors' use of the website will generally be transmitted to and stored by Third-Party Service on servers in the [United States]. Please be aware that Company cannot or does not control the use of cookies or the resulting information by the Third Party Service.</p>
                              <p>On behalf of the website operator, Third Party Service will use this information for the purpose of evaluating the website / location / credentials for its users, in order to compile reports on website activity and to provide other services relating to website activity and internet usage for website operators.</p>
                              <p>Third-Party Service will not associate the IP address transferred any other data held by the Company. You may refuse the use of cookies by selecting the appropriate settings on your browser. However, please note that in this case, you may not be able to use the full functionality of this website.</p>
                            </SubSection>
                            <SubSection title="3.8 Content Recommendations">
                              <p>We may process information collected under section 3 so that content, products and services shown on the pages and in update messages displayed when launching the service can be tailored to meet your needs and populated with relevant recommendations and offers. This is done to improve your customer experience.</p>
                              <p>Subject to your separate consent or where explicitly permitted under applicable laws on email marketing, the Company may send you marketing messages about products and services offered by the Company to your email address. In such a case we may also use your collected information to customise such marketing messages as well as collect information on whether you opened such messages and which links in their text you followed.</p>
                              <p>You can opt out or withdraw your consent to receive marketing emails at any time by either withdrawing the consent on the same page where you previously provided it or clicking the "unsubscribe" link provided in every marketing email. Notwithstanding any opt out of promotional or marketing emails by you, we reserve the right to contact you regarding account status, changes to the user agreement and other matters relevant to the underlying service and/or the information collected.</p>
                            </SubSection>
                            <SubSection title="3.9 Information Required to Detect Violations">
                              <p>We collect certain data that is required for our detection, investigation and prevention of fraud, cheating and other violations of the applicable laws ("Violations"). This data is used only for the purposes of detection, investigation, prevention and, where applicable, acting on of such Violations and stored only for the minimum amount of time needed for this purpose. If the data indicates that a Violation has occurred, we will further store the data for the establishment, exercise or defence of legal claims during the applicable statute of limitations or until a legal case related to it has been resolved. Please note that the specific data stored for this purpose may not be disclosed to you if the disclosure will compromise the mechanism through which we detect, investigate and prevent such Violations.</p>
                            </SubSection>
                          </LegalSection>
            
                          <LegalSection title="4. How We Store Data">
                            <SubSection title="4.1 Period of Storage">
                              <p>We will store your information as long as necessary to fulfil the purposes for which the information is collected and processed or — where the applicable law provides for longer storage and retention period — for the storage and retention period required by law. In particular, if you terminate your User Account, your Personal Data will be marked for deletion except to the degree legal requirements or other prevailing legitimate purposes dictate a longer storage. All your data and credits will be lost after deletion.</p>
                            </SubSection>
                            <SubSection title="4.2 Deletion of Data">
                              <p>In cases where Personal Data cannot be completely deleted in order to ensure the consistency of the system, the user experience or the community, your information will be permanently anonymized. Please note that the Company is required to retain certain transactional data under statutory commercial and tax law for a period of up to ten (10) years.</p>
                              <p>If you withdraw your consent on which a processing of your Personal Data, we will delete your Personal Data without undue delay to the extent that the collection and processing of the Personal Data was based on the withdrawn consent.</p>
                              <p>If you exercise a right to object to the a processing of your Personal Data, we will review your objection and delete your Personal Data that we processed for the purpose to which you objected without undue delay, unless another legal basis for processing and retaining this data exists or unless applicable law requires us to retain the data.</p>
                            </SubSection>
                            <SubSection title="4.3 Location of Storage">
                              <p>The data that we collect from you may be transferred to, and stored at United States of America, or a destination outside of your jurisdiction. It may also be processed by third parties who operate outside of your jurisdiction. By submitting your personal data you agree to this transfer, storing or processing of data outside of your jurisdiction. We will take all steps reasonably necessary to ensure that your data is treated securely in accordance with this privacy policy.</p>
                            </SubSection>
                          </LegalSection>
            
                          <LegalSection title="5. Who Has Access to Data">
                              <p>5.1 The Company and its subsidiaries may share your Personal Data with each other and use it to the degree necessary to achieve the purposes listed in section 2 above. This includes our overseas offices, affiliates, business partners and counterparts (on a need-to-know basis only). In the event of a reorganization, sale or merger we may transfer Personal Data to the relevant or proposed transferees of our operations (or a substantial part thereof) in any part of the world.</p>
                              <p>5.2 We may also share your Personal Data with our third party providers that provide customer support services in connection with goods, Content and Services distributed via us. Your Personal Data will be used in accordance with this Privacy Policy and only as far as this is necessary for performing customer support services.</p>
                              <p>5.3 We may also share your information with our personnel, agents, advisers, auditors, contractors, financial institutions, and service providers in connection with our operations or services (for example staff engaged in the fulfilment of your order, the processing of your payment and the provision of support services); persons under a duty of confidentiality to us; or persons to whom we are required to make disclosure under applicable laws and regulations in any part of the world.</p>
                              <p>5.4 In accordance with internet standards, we may also share certain information (including your IP address and the identification of content you wish to access) with our third party network providers that provide content delivery network services and server services in connection with us. Our content delivery network providers enable the delivery of digital content you have requested, by using a system of distributed servers that deliver the content to you, based on your geographic location.</p>
                              <p>5.5 The Company may allow you to link your User Account to an account offered by a third party. If you consent to link the accounts, the Company may collect and combine information you allowed the Company to receive from a third party with information of your User Account to the degree allowed by your consent at the time. If the linking of the accounts requires the transmission of information about your person from the Company to a third party, you will be informed about it before the linking takes place and you will be given the opportunity to consent to the linking and the transmission of your information. The third party's use of your information will be subject to the third party's privacy policy, which we encourage you to review.</p>
                              <p>5.6 The Company may release Personal Data to comply with court orders or laws and regulations that require us to disclose such information.</p>
                              <p>5.7 We make certain data related to your User Account available to other users. This information can be accessed by anyone by querying your ID. At a minimum, the public persona name you have chosen to represent you are accessible this way. The accessibility of any additional info about you can be controlled through your user profile page; data publicly available on your profile page can be accessed automatically. While we do not knowingly share Personally Identifying Information about you such as your real name or your email address, any information you share about yourself on your public profile can be accessed, including information that may make you identifiable.</p>
                              <p>5.8 The community includes message boards, forums and/or chat areas, where users can exchange ideas and communicate with each other. When posting a message to a board, forum or chat area, please be aware that the information is being made publicly available online; therefore, you are doing so at your own risk; and that such information can be collected, correlated and used by third parties and may result in unsolicited messages from other posters or third parties and these activities are beyond our control. If your Personal Data is posted on one of our community forums against your will, please use the reporting function and the help site to request its removal.</p>
                          </LegalSection>
            
                          <LegalSection title="6. Your Rights and Control Mechanisms">
                            <p>You have the right to:</p>
                            <ul className="list-disc list-inside space-y-2 pl-4">
                              <li>check whether we hold personal data about you;</li>
                              <li>access any personal data we hold about you;</li>
                              <li>require us to correct any inaccuracy or error in any personal data we hold about you;</li>
                              <li>request for the deletion of your personal data through the deletion of the user account.</li>
                            </ul>
                          </LegalSection>
            
                          <LegalSection title="7. Children">
                            <p>The minimum age to create a User Account is 13. the Company will not knowingly collect Personal Data from children under this age. Insofar as certain countries apply a higher age of consent for the collection of Personal Data, the Company requires parental consent before a User Account can be created and Personal Data associated with it collected. The Company encourages parents to instruct their children to never give out personal information when online.</p>
                          </LegalSection>
            
                          <LegalSection title="8. Contact Info">
                            <p>You can contact the Company's data protection officer at the address below.</p>
                            <p>While we review any request sent by mail, please be aware that to combat fraud, harassment and identity theft, the only way to access, rectify or delete your data is through logging in with your User Account at <a href="mailto:privacy@markedmuse.com" className="text-blue-400 hover:text-blue-300">privacy@markedmuse.com</a>.</p>
                            <address className="not-italic mt-4 space-y-1">
                              <div>10222 Sable Trail Lane</div>
                              <div>Houston, Texas, USA 77064</div>
                              <div>Attention: Privacy Officer</div>
                            </address>
                          </LegalSection>
            
                          <LegalSection title="9. Revision Date">
                            <p>This privacy policy was last updated on 12 August 2025 ("Revision Date"). If you were a user before the Revision Date, it replaces the existing Privacy Policy. The Company reserves the right to change this policy at any time by notifying the users of the existence of a new privacy statement. This policy is not intended to and does not create any contractual or legal rights in or behalf of any party.</p>
                          </LegalSection>
                        </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-700/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <Image
                src="/mm-trans.png"
                alt="MarkedMuse"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="font-bold text-slate-100">MarkedMuse</span>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-slate-400 text-sm">
                © 2025 MarkedMuse. Building the future of creative communities.
              </p>
              <div className="text-slate-400 text-sm mt-2 flex gap-4 justify-center md:justify-end">
                <Link href="/tos" className="hover:text-slate-100 transition-colors">
                  Terms of Service
                </Link>
                <Link href="/privacy" className="hover:text-slate-100 transition-colors">
                  Privacy Policy
                </Link>
              </div>
              <p className="text-slate-500 text-xs mt-1">
                Coming Soon • Stay Tuned
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const LegalSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <section className="space-y-4">
    <h2 className="text-2xl font-semibold text-blue-300 border-b border-slate-700 pb-2">{title}</h2>
    <div className="space-y-4 text-slate-300">{children}</div>
  </section>
);

const SubSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="mt-6">
    <h3 className="text-xl font-semibold text-slate-100 mb-3">{title}</h3>
    <div className="space-y-4">{children}</div>
  </div>
);


export default PrivacyPolicyPage;