import * as React from 'react';
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Img,
  Link,
  Hr,
} from '@react-email/components';

interface ContactEmailTemplateProps {
  name: string;
  email: string;
  phone: string;
  inquiry: string;
}

export default function ContactEmailTemplate({
  name,
  email,
  phone,
  inquiry,
}: ContactEmailTemplateProps) {

  const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
  });

  return (
    <Html>
      <Head />
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Section style={headerStyle}>
            <Img
              src="https://www.furdeconstructions.com/logo.png"
              alt="Furde Constructions Logo"
              width="180"
              style={logoStyle}
            />
          </Section>
          
          <Section style={contentStyle}>
            <Text style={titleStyle}>New Contact Form Submission</Text>
            
            <Text style={introTextStyle}>
              You have received a new inquiry from your website contact form.
            </Text>
            
            <Section style={infoRowStyle}>
              <Text style={labelStyle}>NAME</Text>
              <Text style={valueStyle}>{name}</Text>
            </Section>
            
            <Section style={infoRowStyle}>
              <Text style={labelStyle}>EMAIL ADDRESS</Text>
              <Link href={`mailto:${email}`} style={linkStyle}>
                {email}
              </Link>
            </Section>
            
            <Section style={infoRowStyle}>
              <Text style={labelStyle}>PHONE NUMBER</Text>
              <Link href={`tel:${phone}`} style={linkStyle}>
                {phone}
              </Link>
            </Section>
            
            <Section style={infoRowStyle}>
              <Text style={labelStyle}>INQUIRY ABOUT</Text>
              <Text style={valueStyle}>{inquiry}</Text>
            </Section>

             <Section style={infoRowStyle}>
              <Text style={labelStyle}>Date</Text>
              <Text style={valueStyle}>{date}</Text>
            </Section>
            
            <Hr style={dividerStyle} />
            
            <Text style={footerNoteStyle}>
              Please respond to this inquiry at your earliest convenience.
            </Text>
          </Section>
          
          <Section style={footerStyle}>
            <Text style={footerTitleStyle}>
              <strong>Furde Constructions</strong>
            </Text>
            <Text style={footerTextStyle}>
              This email was sent from your website contact form.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const bodyStyle = {
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  lineHeight: '1.6',
  color: '#333',
  backgroundColor: '#f4f4f4',
};

const containerStyle = {
  maxWidth: '600px',
  margin: '0 auto',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  overflow: 'hidden',
};

const headerStyle = {
  background: 'linear-gradient(135deg, #FFEAD4 0%, #f79540 100%)',
  padding: '40px 20px',
  textAlign: 'center' as const,
};

const logoStyle = {
  margin: '0 auto',
  display: 'block',
};

const contentStyle = {
  padding: '40px 30px',
};

const titleStyle = {
  color: '#CA6F1E',
  fontSize: '24px',
  fontWeight: '600',
  marginBottom: '20px',
  borderBottom: '2px solid #CA6F1E',
  paddingBottom: '10px',
};

const introTextStyle = {
  fontSize: '16px',
  color: '#666',
  marginBottom: '30px',
};

const infoRowStyle = {
  marginBottom: '20px',
  padding: '15px',
  backgroundColor: '#f9f9f9',
  borderRadius: '6px',
  borderLeft: '4px solid #CA6F1E',
};

const labelStyle = {
  fontWeight: '600',
  color: '#555',
  fontSize: '14px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
  marginBottom: '5px',
  margin: '0 0 5px 0',
};

const valueStyle = {
  color: '#333',
  fontSize: '16px',
  margin: '0',
};

const linkStyle = {
  color: '#CA6F1E',
  textDecoration: 'none',
  fontSize: '16px',
};

const dividerStyle = {
  borderTop: '1px solid #e0e0e0',
  margin: '30px 0',
};

const footerNoteStyle = {
  fontSize: '14px',
  color: '#888',
  fontStyle: 'italic',
};

const footerStyle = {
  backgroundColor: '#f9f9f9',
  padding: '20px',
  textAlign: 'center' as const,
  borderTop: '1px solid #e0e0e0',
};

const footerTitleStyle = {
  margin: '0 0 10px 0',
  fontSize: '14px',
  color: '#777',
};

const footerTextStyle = {
  margin: '0',
  fontSize: '14px',
  color: '#777',
};
