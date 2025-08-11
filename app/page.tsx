'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Music, Users, Zap, Mail, MessageCircle, ArrowRight, Play, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSubmitted(true);
    setIsSubmitting(false);
    setEmail('');
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Here you would integrate with Google Sheets API
    // For now, we'll simulate the submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setName('');
    setMessage('');
    // Show success message
  };

  const communities = [
    {
      name: 'Tyler Levs',
      description: 'Independent musician and producer pushing boundaries with electronic, folk, and alternative sounds.',
      image: '/TylerLevs.png',
      url: 'https://tylerlevs.com',
      genre: 'Country/Alternative'
    },
    {
      name: 'Mutu4l',
      description: 'Collaborative music duo creating unique harmonies and innovative soundscapes.',
      image: '/mutu4l.png',
      url: 'https://mutu4l.com',
      genre: 'Indie/Alternative'
    },
    {
      name: 'FSO',
      description: 'Gaming, Music, and development community engaging the future through innovative content and experiences.',
      image: '/fso.png',
      url: 'https://fso.gg',
      genre: 'Gaming/Creative'
    },
    {
      name: 'Joliet4',
      description: 'Independent singer/songwriter and recording artist creating authentic, heartfelt music.',
      image: '/joliet4.png',
      url: 'https://joliet4.com',
      genre: 'Singer/Songwriter'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Image
                src="/mm-trans.png"
                alt="MarkedMuse"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <span className="font-bold text-xl" style={{ color: '#545454' }}>MarkedMuse</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-slate-300 hover:text-slate-100 transition-colors">About</a>
              <a href="#communities" className="text-slate-300 hover:text-slate-100 transition-colors">Communities</a>
              <a href="#contact" className="text-slate-300 hover:text-slate-100 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <Image
              src="/mm-trans.png"
              alt="MarkedMuse Logo"
              width={120}
              height={120}
              className="mx-auto mb-6 w-30 h-30"
            />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight" style={{ color: '#545454' }}>
            The Future of
            <span className="block bg-gradient-to-r from-blue-400 to-slate-300 bg-clip-text text-transparent">
              Creative Communities
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            MarkedMuse is building the ultimate platform for independent musicians and creatives 
            to grow their audience, connect with their community, and showcase their art.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30 px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              Coming Soon
            </Badge>
            <Badge variant="outline" className="border-slate-400/30 text-slate-300 px-4 py-2">
              <Users className="w-4 h-4 mr-2" />
              Join the Waitlist
            </Badge>
          </div>

          {/* Newsletter Signup */}
          <div className="max-w-md mx-auto">
            {!submitted ? (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-slate-800/50 border-slate-600/50 text-slate-100 placeholder:text-slate-400 focus:border-blue-400"
                />
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-blue-600 to-slate-600 hover:from-blue-700 hover:to-slate-700 text-white px-6"
                >
                  {isSubmitting ? 'Joining...' : 'Join'}
                </Button>
              </form>
            ) : (
              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 text-green-300">
                <Mail className="w-5 h-5 inline mr-2" />
                Thanks for joining! We'll keep you updated.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#545454' }}>
              Empowering Creative Expression
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              We're building tools and platforms that help independent artists thrive in the digital age.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/50 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-slate-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Music className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-100 mb-4">Showcase Your Art</h3>
                <p className="text-slate-300">
                  Create stunning profiles and galleries to display your music, art, and creative projects.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/50 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-slate-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-100 mb-4">Build Community</h3>
                <p className="text-slate-300">
                  Connect with fans, collaborate with other artists, and grow your audience organically.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/50 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-slate-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-100 mb-4">Amplify Your Reach</h3>
                <p className="text-slate-300">
                  Leverage powerful tools to promote your work and reach new audiences across platforms.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Communities Preview */}
      <section id="communities" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#545454' }}>
              Meet Our Launch Communities
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              These incredible artists and creators are joining MarkedMuse at launch. Get a preview of what's coming.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {communities.map((community, index) => (
              <Card key={index} className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm overflow-hidden group hover:bg-slate-800/50 transition-all duration-300">
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={community.image}
                    alt={community.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-blue-500/80 text-white">
                      {community.genre}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl font-bold text-slate-100">{community.name}</h3>
                    <a 
                      href={community.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                  <p className="text-slate-300 mb-4">{community.description}</p>
                  <Button 
                    variant="outline" 
                    className="border-blue-500/50 text-blue-300 hover:bg-blue-500/20 w-full"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Preview Coming Soon
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <p className="text-slate-400 mb-4">More communities joining soon...</p>
            <Button className="bg-gradient-to-r from-blue-600 to-slate-600 hover:from-blue-700 hover:to-slate-700 text-white">
              Apply to Join Launch
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#545454' }}>
              Get in Touch
            </h2>
            <p className="text-xl text-slate-300">
              Have questions or want to learn more? We'd love to hear from you.
            </p>
          </div>

          <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-slate-800/50 border-slate-600/50 text-slate-100 placeholder:text-slate-400 focus:border-blue-400"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={5}
                    className="bg-slate-800/50 border-slate-600/50 text-slate-100 placeholder:text-slate-400 focus:border-blue-400"
                    placeholder="Tell us about your project or ask us anything..."
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-slate-600 hover:from-blue-700 hover:to-slate-700 text-white"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

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
              <span className="font-bold" style={{ color: '#545454' }}>MarkedMuse</span>
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
}
