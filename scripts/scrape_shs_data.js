import axios from 'axios';
import * as cheerio from 'cheerio';
import { promises as fs } from 'fs';

async function scrapePdfLinks() {
  try {
    // Fetch the webpage
    const response = await axios.get('https://golearnershub.com/lists-of-shs-in-ghana-with-their-categories-2023-2024-2024-2026/');
    const html = response.data;
    const $ = cheerio.load(html);

    // Find all PDF links
    const pdfLinks = [];
    $('a').each((i, link) => {
      const href = $(link).attr('href');
      if (href && href.endsWith('.pdf')) {
        const text = $(link).text().trim() || href;
        pdfLinks.push({
          id: `pdf${i + 1}`,
          title: text,
          description: `PDF document scraped from golearnershub`,
          url: href
        });
      }
    });

    // Write to file
    const output = `export interface PdfLink {\n  id: string;\n  title: string;\n  description: string;\n  url: string;\n}\n\nexport const PDF_LINKS: PdfLink[] = ${JSON.stringify(pdfLinks, null, 2)};\n`;

    await fs.writeFile('src/data/shsData.ts', output);
    console.log('Successfully scraped and saved PDF links!');
  } catch (error) {
    console.error('Error scraping PDF links:', error);
  }
}

scrapePdfLinks(); 