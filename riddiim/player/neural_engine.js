/**
 * RIDDIIM Neural Engine v1.5
 * Sovereign Signal Processor
 */

class NeuralEngine {
  constructor() {
    this.audioCtx = null;
    this.analyser = null;
    this.microphone = null;
    this.isProcessing = false;
    this.signalData = [];
  }

  async startAnalysis() {
    try {
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.microphone = this.audioCtx.createMediaStreamSource(stream);
      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 256;
      this.microphone.connect(this.analyser);
      
      this.isProcessing = true;
      this.signalData = [];
      this.processFrame();
      
      // Stop after 5 seconds and return signature
      return new Promise((resolve) => {
        setTimeout(() => {
          this.stopAnalysis();
          resolve(this.calculateSignature());
        }, 5000);
      });
    } catch (err) {
      console.error('NEURAL_SIGNAL_FAILURE:', err);
      return null;
    }
  }

  processFrame() {
    if (!this.isProcessing) return;
    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(dataArray);
    
    // Find the dominant frequency (spectral peak)
    let maxVal = 0;
    let maxIdx = 0;
    for (let i = 0; i < dataArray.length; i++) {
      if (dataArray[i] > maxVal) {
        maxVal = dataArray[i];
        maxIdx = i;
      }
    }
    
    if (maxVal > 50) { // Threshold
      this.signalData.push(maxIdx);
      this.drawCanvas(dataArray);
    }
    
    requestAnimationFrame(() => this.processFrame());
  }

  drawCanvas(data) {
    const canvas = document.getElementById('neural-canvas');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    const barW = w / data.length;
    for(let i=0; i<data.length; i++) {
      const barH = (data[i] / 255) * h;
      ctx.fillRect(i * barW, h - barH, barW - 1, barH);
    }
  }

  stopAnalysis() {
    this.isProcessing = false;
    if (this.microphone) {
      this.microphone.mediaStream.getTracks().forEach(t => t.stop());
    }
  }

  calculateSignature() {
    if (this.signalData.length === 0) return 'UNKNOWN_SIGNAL';
    
    // Calculate average peak frequency
    const avg = this.signalData.reduce((a, b) => a + b, 0) / this.signalData.length;
    
    // Map frequency index to a "Neural Vibe" keyword
    if (avg < 10) return 'bass melodic';
    if (avg < 30) return 'acoustic vocal';
    if (avg < 60) return 'pop energy';
    return 'electronic high';
  }
}

window.NeuralEngine = new NeuralEngine();
