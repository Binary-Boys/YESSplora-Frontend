import fs from 'fs';
import path from 'path';
import QRCode from 'qrcode';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const qractionsFile = path.join(__dirname, '../../Qractions.txt');
const outputDir = path.join(__dirname, '../');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

async function generateQRCodes() {
    try {
        // Read the Qractions.txt file
        const data = fs.readFileSync(qractionsFile, 'utf8');
        const lines = data.split('\n').filter(line => line.trim() !== '');
        
        console.log(`Found ${lines.length} lines to process...`);
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            // Skip empty lines
            if (!line) continue;
            
            // Parse the line using ':' or ' ' as delimiter
            let delimiterIndex = line.indexOf(':');
            let delimiter = ':';
            
            // If no colon found, try to find a space after a pattern like "yesslvl-X" or "stallyessX"
            if (delimiterIndex === -1) {
                // Look for pattern: word-number followed by space
                const match = line.match(/^(\w+-\d+)\s+(.+)$/);
                if (match) {
                    const qrString = match[1].trim();
                    const description = match[2].trim();
                    
                    console.log(`Line ${i + 1}: QR String="${qrString}", Description="${description}"`);
                    
                    // Skip if QR string is empty
                    if (!qrString) {
                        console.log(`Skipping line ${i + 1}: Empty QR string - "${line}"`);
                        continue;
                    }
                    
                    console.log(`Generating QR code for: "${qrString}" (${description})`);
                    
                    // Generate QR code options
                    const options = {
                        type: 'png',
                        quality: 0.92,
                        margin: 1,
                        color: {
                            dark: '#000000',
                            light: '#FFFFFF'
                        },
                        width: 256
                    };
                    
                    // Generate QR code
                    const qrCodeBuffer = await QRCode.toBuffer(qrString, options);
                    
                    // Create filename (sanitize the string for filename)
                    const sanitizedString = qrString.replace(/[^a-zA-Z0-9-_]/g, '_');
                    const filename = `${sanitizedString}.png`;
                    const filepath = path.join(outputDir, filename);
                    
                    // Save the QR code
                    fs.writeFileSync(filepath, qrCodeBuffer);
                    console.log(`✓ Saved: ${filename}`);
                    continue;
                } else {
                    console.log(`Skipping line ${i + 1}: No valid delimiter found - "${line}"`);
                    continue;
                }
            }
            
            const qrString = line.substring(0, delimiterIndex).trim();
            const description = line.substring(delimiterIndex + 1).trim();
            
            // Skip if QR string is empty
            if (!qrString) {
                console.log(`Skipping line ${i + 1}: Empty QR string - "${line}"`);
                continue;
            }
            
            console.log(`Generating QR code for: "${qrString}" (${description})`);
            
            // Generate QR code options
            const options = {
                type: 'png',
                quality: 0.92,
                margin: 1,
                color: {
                    dark: '#000000',
                    light: '#FFFFFF'
                },
                width: 256
            };
            
            // Generate QR code
            const qrCodeBuffer = await QRCode.toBuffer(qrString, options);
            
            // Create filename (sanitize the string for filename)
            const sanitizedString = qrString.replace(/[^a-zA-Z0-9-_]/g, '_');
            const filename = `${sanitizedString}.png`;
            const filepath = path.join(outputDir, filename);
            
            // Save the QR code
            fs.writeFileSync(filepath, qrCodeBuffer);
            console.log(`✓ Saved: ${filename}`);
        }
        
        console.log('\n🎉 All QR codes generated successfully!');
        console.log(`📁 Output directory: ${outputDir}`);
        
    } catch (error) {
        console.error('❌ Error generating QR codes:', error.message);
        process.exit(1);
    }
}

// Run the generator
generateQRCodes();
