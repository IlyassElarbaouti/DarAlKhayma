import * as React from 'react';

export default function PrivacyPolicy() {
  return React.createElement('div', {
    style: { padding: '80px 20px 40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }
  }, [
    React.createElement('h1', {
      key: 'title',
      style: { fontSize: '2.5rem', marginBottom: '2rem', color: '#333' }
    }, 'Privacy Policy'),
    
    React.createElement('div', {
      key: 'intro',
      style: { marginBottom: '2rem' }
    }, [
      React.createElement('p', {
        key: 'intro-text',
        style: { lineHeight: '1.6', marginBottom: '1rem', color: '#666' }
      }, 'At Dar Al Khayma, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, share, and safeguard your information when you use our website, book our properties, or interact with our services, including our WhatsApp bot.'),
      
      React.createElement('p', {
        key: 'updated',
        style: { lineHeight: '1.6', color: '#666' }
      }, [
        React.createElement('strong', { key: 'label' }, 'Last Updated: '),
        'September 17, 2025'
      ])
    ]),
    
    React.createElement('section', {
      key: 'info-collection',
      style: { marginBottom: '2rem' }
    }, [
      React.createElement('h2', {
        key: 'title',
        style: { fontSize: '1.5rem', marginBottom: '1rem', color: '#333' }
      }, 'Information We Collect'),
      
      React.createElement('ul', {
        key: 'list',
        style: { lineHeight: '1.6', color: '#666', paddingLeft: '1.5rem' }
      }, [
        React.createElement('li', { key: '1' }, 'Personal Information: Name, email, phone number, postal address, and payment information'),
        React.createElement('li', { key: '2' }, 'Property Preferences: Accommodation preferences, special requests, and travel patterns'),
        React.createElement('li', { key: '3' }, 'Communication Records: Records of communications through phone, email, WhatsApp, or other messaging platforms'),
        React.createElement('li', { key: '4' }, 'Website Usage Data: Information about how you use our website'),
        React.createElement('li', { key: '5' }, 'Device Information: Technical information about your device and browser')
      ])
    ]),
    
    React.createElement('section', {
      key: 'whatsapp-integration',
      style: { marginBottom: '2rem' }
    }, [
      React.createElement('h2', {
        key: 'title',
        style: { fontSize: '1.5rem', marginBottom: '1rem', color: '#333' }
      }, 'WhatsApp & Facebook Integration'),
      
      React.createElement('p', {
        key: 'description',
        style: { lineHeight: '1.6', marginBottom: '1rem', color: '#666' }
      }, 'Our WhatsApp bot service is powered by Meta (Facebook) technologies. By using our WhatsApp service, you acknowledge that your messages may be processed according to WhatsApp\'s and Meta\'s privacy policies in addition to our own.'),
      
      React.createElement('div', {
        key: 'links',
        style: { marginTop: '1rem' }
      }, [
        React.createElement('a', {
          key: 'whatsapp-link',
          href: 'https://www.whatsapp.com/legal/privacy-policy',
          target: '_blank',
          rel: 'noopener noreferrer',
          style: { color: '#0066cc', textDecoration: 'underline', marginRight: '2rem' }
        }, 'WhatsApp Privacy Policy'),
        
        React.createElement('a', {
          key: 'meta-link',
          href: 'https://www.facebook.com/privacy/policy',
          target: '_blank',
          rel: 'noopener noreferrer',
          style: { color: '#0066cc', textDecoration: 'underline' }
        }, 'Meta Privacy Policy')
      ])
    ]),
    
    React.createElement('section', {
      key: 'contact',
      style: { marginBottom: '2rem' }
    }, [
      React.createElement('h2', {
        key: 'title',
        style: { fontSize: '1.5rem', marginBottom: '1rem', color: '#333' }
      }, 'Contact Us'),
      
      React.createElement('p', {
        key: 'description',
        style: { lineHeight: '1.6', marginBottom: '1rem', color: '#666' }
      }, 'If you have any questions about this Privacy Policy or want to exercise your rights, please contact us:'),
      
      React.createElement('div', {
        key: 'contact-info',
        style: { color: '#666' }
      }, [
        React.createElement('p', { key: 'email' }, [
          React.createElement('strong', { key: 'label' }, 'Email: '),
          'privacy@daralkhayma.com, hello@daralkhayma.com'
        ]),
        React.createElement('p', { key: 'phone' }, [
          React.createElement('strong', { key: 'label' }, 'Phone: '),
          '+212774214018'
        ]),
        React.createElement('p', { key: 'address' }, [
          React.createElement('strong', { key: 'label' }, 'Address: '),
          'Dar Al Khayma, Agadir, Morocco'
        ])
      ])
    ])
  ]);
}