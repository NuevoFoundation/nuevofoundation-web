import emailjs from '@emailjs/browser';
import * as React from "react";

interface TestEmailState {
  status: string;
  result: any;
}

export class TestEmail extends React.Component<{}, TestEmailState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      status: "Ready to test",
      result: null
    };
  }

  testEmailSend = () => {
    this.setState({ status: "Sending test email...", result: null });
    
    const testParams = {
      name: "Test User",
      email: "test@example.com",
      subject: "Test Email",
      message: "This is a test message from the contact form"
    };

    console.log("Testing email with params:", testParams);

    emailjs.send(
      "service_wdpyhgp",
      "template_7txsx24",
      testParams,
      "3YzjZvDYoArRahjiw"
    )
      .then((response) => {
        console.log("SUCCESS:", response);
        this.setState({ 
          status: "✅ Email sent successfully!", 
          result: response 
        });
      })
      .catch((error) => {
        console.error("ERROR:", error);
        this.setState({ 
          status: "❌ Email sending failed", 
          result: error 
        });
      });
  };

  render() {
    return (
      <div style={{ padding: "20px", border: "1px solid #ccc", margin: "20px" }}>
        <h3>Email Testing Component</h3>
        <p>Status: {this.state.status}</p>
        <button onClick={this.testEmailSend}>Test Email Send</button>
        {this.state.result && (
          <pre style={{ background: "#f5f5f5", padding: "10px", marginTop: "10px" }}>
            {JSON.stringify(this.state.result, null, 2)}
          </pre>
        )}
      </div>
    );
  }
}