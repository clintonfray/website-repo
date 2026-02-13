const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

const podName = process.env.POD_NAME || 'unknown';
const nodeName = process.env.NODE_NAME || 'unknown';
const nodeVersion = process.env.NODE_VERSION || 'unknown';

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Pub - Starship Command Bridge</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Orbitron', 'Courier New', monospace;
            background: #000;
            color: #00ffff;
            height: 100vh;
            overflow: hidden;
            position: relative;
          }
          
          .starfield {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
          }
          
          .star {
            position: absolute;
            background: white;
            border-radius: 50%;
            animation: twinkle 3s infinite;
          }
          
          @keyframes twinkle {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
          
          .starship-container {
            position: relative;
            z-index: 1;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: radial-gradient(ellipse at center, rgba(0,50,100,0.3) 0%, rgba(0,0,0,0.8) 100%);
          }
          
          .holographic-frame {
            position: relative;
            padding: 60px 80px;
            border: 2px solid #00ffff;
            border-radius: 20px;
            background: linear-gradient(135deg, rgba(0,255,255,0.1) 0%, rgba(0,100,200,0.1) 100%);
            box-shadow: 
              0 0 30px rgba(0,255,255,0.5),
              inset 0 0 30px rgba(0,255,255,0.1);
            animation: glow 2s ease-in-out infinite alternate;
          }
          
          @keyframes glow {
            from { box-shadow: 0 0 30px rgba(0,255,255,0.5), inset 0 0 30px rgba(0,255,255,0.1); }
            to { box-shadow: 0 0 50px rgba(0,255,255,0.8), inset 0 0 40px rgba(0,255,255,0.2); }
          }
          
          .pod-display {
            text-align: center;
            margin-bottom: 40px;
          }
          
          .pod-label {
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 4px;
            color: #00cccc;
            margin-bottom: 15px;
            opacity: 0.8;
          }
          
          .pod-name {
            font-size: 48px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 6px;
            color: #00ffff;
            text-shadow: 0 0 20px rgba(0,255,255,0.8);
            animation: pulse 2s ease-in-out infinite;
          }
          
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.05); opacity: 0.9; }
          }
          
          .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin-top: 30px;
          }
          
          .info-item {
            text-align: center;
            padding: 20px;
            border: 1px solid rgba(0,255,255,0.3);
            border-radius: 10px;
            background: rgba(0,100,200,0.1);
          }
          
          .info-label {
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: #00cccc;
            margin-bottom: 8px;
            opacity: 0.7;
          }
          
          .info-value {
            font-size: 18px;
            color: #00ffff;
            font-weight: bold;
            text-shadow: 0 0 10px rgba(0,255,255,0.5);
          }
          
          .status-bar {
            position: absolute;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            text-align: center;
            font-size: 12px;
            color: #00cccc;
            text-transform: uppercase;
            letter-spacing: 2px;
            opacity: 0.7;
          }
          
          .scanning-line {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, #00ffff, transparent);
            animation: scan 3s linear infinite;
          }
          
          @keyframes scan {
            0% { top: 0; opacity: 1; }
            100% { top: 100%; opacity: 0; }
          }
          
          .coordinates {
            position: absolute;
            top: 30px;
            right: 30px;
            font-size: 10px;
            color: #00cccc;
            text-align: right;
            opacity: 0.6;
          }
        </style>
      </head>
      <body>
        <div class="starfield" id="starfield"></div>
        
        <div class="starship-container">
          <div class="coordinates">
            SECTOR: 7G<br>
            QUADRANT: ALPHA-9<br>
            STATUS: OPERATIONAL
          </div>
          
          <div class="holographic-frame">
            <div class="scanning-line"></div>
            
            <div class="pod-display">
              <div class="pod-label">Starship Designation - <b>Public Image</b></div>
              <div class="pod-name">${podName}</div>
            </div>
            
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Node Registry</div>
                <div class="info-value">${nodeName}</div>
              </div>
              <div class="info-item">
                <div class="info-label">System Status</div>
                <div class="info-value">ONLINE</div>
              </div>
              <div class="info-item">
                <div class="info-label">Warp Core Version</div>
                <div class="info-value">${nodeVersion}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Shields</div>
                <div class="info-value">100%</div>
              </div>
             
            </div>
          </div>
          
          <div class="status-bar">
            Kubernetes Federation Starship • Advanced Navigation System • Status: All Systems Operational
          </div>
        </div>
        
        <script>
          function createStarfield() {
            const starfield = document.getElementById('starfield');
            const starCount = 150;
            
            for (let i = 0; i < starCount; i++) {
              const star = document.createElement('div');
              star.className = 'star';
              
              const size = Math.random() * 2 + 1;
              star.style.width = size + 'px';
              star.style.height = size + 'px';
              star.style.left = Math.random() * 100 + '%';
              star.style.top = Math.random() * 100 + '%';
              star.style.animationDelay = Math.random() * 3 + 's';
              star.style.animationDuration = (Math.random() * 3 + 2) + 's';
              
              starfield.appendChild(star);
            }
          }
          
          createStarfield();
        </script>
      </body>
    </html>
  `);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
  console.log(`Pod Name: ${podName}`);
  console.log(`Node Name: ${nodeName}`);
});