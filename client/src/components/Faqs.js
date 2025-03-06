import React from 'react';
import { Accordion, Container, Row, Col, Card } from 'react-bootstrap';

const FAQs = () => {
  const faqData = [
    {
      category: "General Questions",
      items: [
        {
          question: "What are your business hours?",
          answer: "We are open Monday through Friday from 9:00 AM to 5:00 PM Eastern Time. Our customer service team is available during these hours to assist you."
        },
        {
          question: "How can I contact customer support?",
          answer: "You can reach our support team through email at support@example.com, phone at (555) 123-4567, or via Live Chat available on our website during business hours."
        },
        {
          question: "Where are you located?",
          answer: "Our main office is located in Boston, Massachusetts. We also have satellite offices in Chicago and San Francisco."
        }
      ]
    },
    {
      category: "Products & Services",
      items: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. For business accounts, we also offer NET 30 payment terms upon approval."
        },
        {
          question: "What is your return policy?",
          answer: "We offer a 30-day money-back guarantee on all our products. Items must be returned in their original packaging and in unused condition. Shipping costs for returns are the responsibility of the customer unless the item was received damaged or incorrect."
        },
        {
          question: "Do you ship internationally?",
          answer: "Yes, we ship to most countries worldwide. International shipping rates vary by location and can be calculated at checkout. Please note that customers are responsible for any import duties or taxes."
        }
      ]
    },
    {
      category: "Account Management",
      items: [
        {
          question: "How do I create an account?",
          answer: "Click the 'Sign Up' button in the top right corner of our website. Fill out the registration form with your email address and create a password. You'll receive a confirmation email to verify your account."
        },
        {
          question: "How can I reset my password?",
          answer: "Click 'Forgot Password' on the login page and enter your email address. We'll send you instructions to reset your password. For security reasons, password reset links expire after 24 hours."
        },
        {
          question: "How do I update my account information?",
          answer: "Log into your account and navigate to 'Account Settings.' Here you can update your personal information, shipping addresses, and payment methods."
        }
      ]
    },
    {
      category: "Technical Support",
      items: [
        {
          question: "What browsers do you support?",
          answer: "Our website is optimized for the latest versions of Google Chrome, Mozilla Firefox, Safari, and Microsoft Edge."
        },
        {
          question: "Is my data secure?",
          answer: "Yes, we take data security seriously. We use industry-standard SSL encryption for all transactions and never store sensitive payment information on our servers. Our systems are regularly audited for security compliance."
        },
        {
          question: "What should I do if I experience technical issues?",
          answer: "First, try clearing your browser cache and cookies. If the issue persists, contact our technical support team with a description of the problem, screenshots (if applicable), your browser type and version, and your operating system."
        }
      ]
    }
  ];

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={10}>
          <h1 className="text-center mb-5">Frequently Asked Questions</h1>
          
          {faqData.map((category, categoryIndex) => (
            <Card className="mb-4" key={categoryIndex}>
              <Card.Header className="bg-primary text-white">
                <h2 className="h5 mb-0">{category.category}</h2>
              </Card.Header>
              <Card.Body>
                <Accordion>
                  {category.items.map((item, itemIndex) => (
                    <Accordion.Item 
                      eventKey={`${categoryIndex}-${itemIndex}`} 
                      key={`${categoryIndex}-${itemIndex}`}
                    >
                      <Accordion.Header>
                        {item.question}
                      </Accordion.Header>
                      <Accordion.Body>
                        {item.answer}
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </Card.Body>
            </Card>
          ))}
          
          <div className="text-center mt-5">
            <h3>Need More Help?</h3>
            <p>If you couldn't find the answer you're looking for, please contact our customer support team. We're here to help!</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default FAQs;