import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';

interface NetworkInfo {
  ip: string;
  version: string;
  city?: string;
  country?: string;
  isp?: string;
}

function Concepts() {
  const navigate = useNavigate();
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const goToSection = (section: string) => {
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const fetchNetworkInfo = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch IP info from ipapi.co (free tier)
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      setNetworkInfo({
        ip: data.ip,
        version: data.version || (data.ip.includes(':') ? 'IPv6' : 'IPv4'),
        city: data.city,
        country: data.country_name,
        isp: data.org,
      });
    } catch (err) {
      setError('Unable to fetch network information. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-landing">
      <header className="header">
        <div className="container">
          <h1 className="logo">Kent Harmon</h1>
          <nav className="nav">
            <Link to="/">Home</Link>
            <a href="#" onClick={(e) => { e.preventDefault(); goToSection('about'); }}>About</a>
            <a href="#" onClick={(e) => { e.preventDefault(); goToSection('projects'); }}>Projects</a>
            <a href="#" onClick={(e) => { e.preventDefault(); goToSection('contact'); }}>Contact</a>
          </nav>
        </div>
      </header>
      
      <section className="hero" style={{ minHeight: '35vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '5rem' }}>
        <div className="container banner-content" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2>Networking <span className="highlight" data-text="Concepts">Concepts</span></h2>
          <p>A quick dive into networking principles and technologies.</p>
        </div>
      </section>

      {/* DNS Section */}
      <section className="about" id="dns-section">
        <div className="container">
          <h3>DNS (Domain Name System)</h3>
          <div className="concept-content">
            <p>
              <strong>What is it?</strong> DNS is the "phonebook of the internet" — it translates human-readable 
              domain names (like <code>google.com</code>) into IP addresses (like <code>142.250.80.46</code>) 
              that computers use to identify each other.
            </p>
            <p>
              <strong>Purpose:</strong> Without DNS, you'd have to memorize numerical IP addresses for every 
              website. DNS makes the internet user-friendly by allowing us to use memorable names instead.
            </p>
            <p>
              <strong>How it works:</strong> When you type a URL, your browser queries DNS servers in a 
              hierarchical lookup.
            </p>
            <div className="code-block">
              <code>
                # Example: nslookup command<br/>
                $ nslookup google.com<br/>
                Server:  dns.google<br/>
                Address:  8.8.8.8<br/><br/>
                Name:    google.com<br/>
                Address:  142.250.80.46
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* IP Addressing Section */}
      <section className="projects" id="ip-section">
        <div className="container">
          <h3>IP Addressing</h3>
          <div className="concept-content">
            <p>
              <strong>What is it?</strong> An IP (Internet Protocol) address is a unique numerical identifier 
              assigned to every device connected to a network. It enables devices to locate and communicate 
              with each other.
            </p>
            
            <div className="ip-comparison">
              <div className="ip-type">
                <h4>IPv4</h4>
                <p>32-bit address format.</p>
                <code>192.168.1.1</code>
                <p className="ip-note">Four octets (0-255) separated by dots.</p>
              </div>
              <div className="ip-type">
                <h4>IPv6</h4>
                <p>128-bit address format with virtually unlimited addresses.</p>
                <code>2001:0db8:85a3:0000:0000:8a2e:0370:7334</code>
                <p className="ip-note">Eight groups of hexadecimal digits.</p>
              </div>
            </div>

            <p>
              <strong>Purpose:</strong> IP addresses enable routing — they tell routers where to send data 
              packets so they reach the correct destination across the global internet.
            </p>

            {/* Interactive Demo */}
            <div className="demo-container">
              <h4>Your Network Information</h4>
              <p>Click to reveal your IP address and network details:</p>
              <div className="demo-row">
                <button 
                  className="cta-btn demo-btn" 
                  onClick={fetchNetworkInfo}
                  disabled={loading}
                >
                  <span>{loading ? 'Fetching...' : networkInfo ? 'Refresh Info' : 'Reveal My IP'}</span>
                </button>
                <div className="info-container">
                  {error && <p className="error-text">{error}</p>}
                  {networkInfo && (
                    <div className="network-info">
                      <div className="info-row">
                        <span className="info-label">IP Address:</span>
                        <span className="info-value">{networkInfo.ip}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Version:</span>
                        <span className="info-value">{networkInfo.version}</span>
                      </div>
                      {networkInfo.city && (
                        <div className="info-row">
                          <span className="info-label">Location:</span>
                          <span className="info-value">{networkInfo.city}, {networkInfo.country}</span>
                        </div>
                      )}
                      {networkInfo.isp && (
                        <div className="info-row">
                          <span className="info-label">ISP:</span>
                          <span className="info-value">{networkInfo.isp}</span>
                        </div>
                      )}
                    </div>
                  )}
                  {!networkInfo && !error && !loading && (
                    <p className="placeholder-text">Your network info will appear here</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Protocols Section */}
      <section className="about" id="protocols-section">
        <div className="container">
          <h3>Protocols: HTTP vs HTTPS</h3>
          <div className="concept-content">
            <p>
              <strong>What are they?</strong> HTTP (HyperText Transfer Protocol) and HTTPS (HTTP Secure) 
              are protocols that define how data is transmitted between your browser and web servers.
            </p>

            <div className="protocol-comparison">
              <div className="protocol-type http">
                <h4>HTTP</h4>
                <ul>
                  <li>Data sent in plain text</li>
                  <li>No encryption</li>
                  <li>Port 80</li>
                  <li>Vulnerable to interception</li>
                </ul>
              </div>
              <div className="protocol-type https">
                <h4>HTTPS</h4>
                <ul>
                  <li>Data encrypted via TLS/SSL</li>
                  <li>Certificate verification</li>
                  <li>Port 443</li>
                  <li>Secure against eavesdropping</li>
                </ul>
              </div>
            </div>

            <h4>HTTP Headers</h4>
            <p>
              Headers are metadata sent with HTTP requests and responses. They contain information about 
              the client, server, content type, caching rules, and more.
            </p>
            <div className="code-block">
              <code>
                # Example Request Headers<br/>
                GET /api/data HTTP/1.1<br/>
                Host: example.com<br/>
                User-Agent: Mozilla/5.0<br/>
                Accept: application/json<br/>
                Authorization: Bearer token123
              </code>
            </div>

            <h4>HTTP Status Codes</h4>
            <p>Status codes indicate the result of an HTTP request:</p>
            <div className="status-codes">
              <div className="status-group">
                <span className="status-badge success">2xx Success</span>
                <p><code>200 OK</code> — Request succeeded</p>
                <p><code>201 Created</code> — Resource created</p>
              </div>
              <div className="status-group">
                <span className="status-badge redirect">3xx Redirect</span>
                <p><code>301 Moved Permanently</code></p>
                <p><code>304 Not Modified</code></p>
              </div>
              <div className="status-group">
                <span className="status-badge client-error">4xx Client Error</span>
                <p><code>400 Bad Request</code></p>
                <p><code>401 Unauthorized</code></p>
                <p><code>404 Not Found</code></p>
              </div>
              <div className="status-group">
                <span className="status-badge server-error">5xx Server Error</span>
                <p><code>500 Internal Server Error</code></p>
                <p><code>503 Service Unavailable</code></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Kent Harmon. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Concepts;
