import { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';

const TermsOfServicePage: NextPage = () => {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-slate-300 bg-clip-text text-transparent">Terms of Service</h1>
            
                        <div className="space-y-12 text-slate-300">
                          <p className="text-lg text-slate-200">PLEASE READ THE TERMS AND CONDITIONS OF THIS POLICY CAREFULLY BEFORE USING THIS SITE. This acceptable use policy governs the standards that apply to any content that you upload to our website, any interactions with our website, including contact with any of our website's users.</p>
                          
                          <LegalSection title="Who we are and how to contact us">
                            <p>markedmuse.com, xlr8tor.com, tylerlevs.com, & joliet4.com are sites operated under the control of Zahavat Group series llc. We are a group of website, software, & internet services development companies. If you have any enquiries regarding this website acceptable use policy, or any questions relating to our site or company, please contact our customer service through official contact links from the website you are accessing.</p>
                          </LegalSection>
                          
                          <LegalSection title="By using our website, you accept our terms and conditions.">
                            <p>Under our website, you accept the terms set out in this policy, and you agree to comply with it. If you do not agree with these terms, please do not use our site.</p>
                          </LegalSection>
                          
                          <LegalSection title="We may make changes to this policy from time to time.">
                            <p>We reserve the right to change the terms and conditions of usage for our website. Every time you wish to use our site, please check that you understand the most recent updated terms and conditions. All registered users of our website will receive an automatic notification when we make any changes or amendments to our policies.</p>
                          </LegalSection>
                          
                          <LegalSection title="Prohibited uses">
                            <p>You may only use our website for lawful purposes. All illegal activities are strictly forbidden on our website. You may not use our site in the following ways (but not limited to):</p>
                            <ul className="list-disc list-inside space-y-2 pl-4">
                              <li>That constitutes breaches in any applicable local, national, or international law or regulation.</li>
                              <li>That constitutes unlawful or fraudulent behavior or purpose or any activities that have an equivalent effect.</li>
                              <li>That intends to do harm or attempt to harm others, no matter the degree of harm intended.</li>
                              <li>To bully, intimate, humiliate, insult, or any other ways that constitute disrespect to any person.</li>
                              <li>To send, download, use or re-use any material from any other third-party website.</li>
                              <li>To distribute, send or transmit any unsolicited or unauthorized advertising or promotional materials, including any activities, is considered spam.</li>
                              <li>To knowingly and intentionally transmit any data, send or upload any materials that contain viruses, such as time bombs, Trojan horses, worms, spyware, keystroke loggers, or any other harmful programs or computer code or any other software that are designed to harm any computer systems or software.</li>
                              <li>Duplicate, make copies, reproduce any data, information, content on our website.</li>
                              <li>Cause damage, disrupt, interfere with:
                                <ul className="list-disc list-inside space-y-2 pl-6 mt-2">
                                  <li>the operation of our site; and</li>
                                  <li>any equipment or network of our site; and</li>
                                  <li>any software that we use; and</li>
                                  <li>any software, database, network, equipment provided by third parties.</li>
                                </ul>
                              </li>
                            </ul>
                          </LegalSection>
            
                          <LegalSection title="Interactive services">
                            <p>We provide interactive services on our site, including: Chat, Comment boards, Forums, Affiliated Artist or Content Creator showcases, Community profiles, Member social media, and Artist to Fanbase communities.</p>
                            <p>All interactive services are moderated either by our staff members, artist community moderators, or automatically detected by our computer system. We are committed to minimizing any possible risks for users from third parties when our users use the interactive services provided on our site. In each case, we will decide what are the appropriate solutions to moderate a relevant service in the light of those risks. We are, however, in no obligation to oversee, moderate or monitor any interactive service we provide on our site. We expressly exclude any liabilities for any loss or damage arising out of the use of any interactive service by a user that constitute breaches of any of our content standards, whether the service is moderated is not.</p>
                            <p>Any persons below the age of 13 ('Minors') may only use our interactive services if they have obtained consent from or are using our interactive services under the company of their parents or guardians to ensure their safety online. Minors who are using any of our interactive services should be made aware of the potential risk that they are exposed to.</p>
                          </LegalSection>
            
                          <LegalSection title="Content standards">
                            <p>These content standards apply to any material that you upload or contribute to our site ('Contribution') and any interactive services associated with it. Any contribution must comply with each and every part of the standard set out in this policy. Zahavat Group reserve the discretionary right to determine whether a contribution breaches the content standards.</p>
                            <h3 className="text-xl font-semibold text-slate-100 mt-6 mb-3">A Contribution must:</h3>
                            <ul className="list-disc list-inside space-y-2 pl-4">
                              <li>Where it states facts, this information must be accurate.</li>
                              <li>Where it states opinions, this must be genuinely held.</li>
                              <li>Comply with all of the applicable rules and law in where it originated from, and also including Laws of England and Wales.</li>
                            </ul>
                            <h3 className="text-xl font-semibold text-slate-100 mt-6 mb-3">A Contribution must not contain anything that:</h3>
                            <ul className="list-disc list-inside space-y-2 pl-4">
                              <li>Can be characterised as defamatory of any person.</li>
                              <li>Can be characterised as offensive, hateful, inflammatory or obscene.</li>
                              <li>Can be characterised as threatening, abuse, invasion of another's private life or privacy, or cause harassment, inconvenience, or needless anxiety.</li>
                              <li>Contain any sexually suggestive or explicit material.</li>
                              <li>Contain any material of child abuse of any kind, including sexual abuse.</li>
                              <li>Promote violence</li>
                              <li>Promote discrimination based on gender, religion, nationality, race, disability, sexual orientation, or age.</li>
                              <li>May infringe any intellectual property rights, including copyright, database right, or trademark of any other person.</li>
                              <li>Are misrepresentations that are likely to deceive any person</li>
                              <li>Are likely to cause any breaches of legal duties owed to a third party, such as but not limited to any contractual duties or duties not to disclose confidential information.</li>
                              <li>Promote any illegal content or activity.</li>
                              <li>Impersonate any person or misrepresent your identity or affiliation with any other person.</li>
                            </ul>
                          </LegalSection>
                          
                          <LegalSection title="Breach of this policy">
                            <p>We reserve the right to take actions against any breaches of our acceptable use policies as we see appropriate. Failure to comply with any of our acceptable use policies constitutes a material breach and this may result in our taking of all or any of the following actions:</p>
                            <ul className="list-disc list-inside space-y-2 pl-4">
                              <li>Immediate, temporary, or permanent withdrawal of your right to use our website.</li>
                              <li>Immediate, temporary, or permanent removal of any Contribution uploaded by you to our website.</li>
                              <li>Issue a letter of warning to you.</li>
                              <li>Initiate legal proceedings against you, for purposes such as including but not limited to reimbursement of all costs on an indemnity base resulting from any breaches of our acceptable use policy.</li>
                              <li>Take any further legal action against you.</li>
                              <li>Disclose any information in relation to breaches of our acceptable use policy to any, governmental or law enforcement authorities as we deem appropriate or required by law.</li>
                            </ul>
                          </LegalSection>
                          
                          <LegalSection title="How this contract can be transferred">
                            <p>We reserve the right to assign any rights and obligations under these terms to any third parties provided this does not adversely affect your rights under these terms.</p>
                          </LegalSection>
            
                          <LegalSection title="Dispute Resolution">
                            <p>If you are a consumer, please note that all terms of this policy, including subject matter and its formation, are governed by the Law of England and Wales. By using our website and any of our services you agree that courts of England and Wales will have exclusive jurisdiction to any disputes relating to acceptable use policy, exceptions for residents of Northern Ireland and Scotland, where they can bring the case in Courts located in Northern Ireland and Scotland respectively.</p>
                            <p>If you are a business entity, please note that all terms of this policy, including subject matter and its formation, contractual disputes, or claims are governed by Texas Law. We both agree that the courts of England and Wales have exclusive jurisdiction for any disputes between us.</p>
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

export default TermsOfServicePage;