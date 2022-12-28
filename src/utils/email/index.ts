import * as fs from 'fs';

export async function generateEmail(
  title: string,
  body: string,
  cta: {
    label: string;
    link: string;
  },
  footer?: string,
): Promise<string> {
  const template = await fs.readFileSync('templates/email.html', 'utf8');

  return template
    .replaceAll('{{title}}', title)
    .replaceAll('{{body}}', body)
    .replaceAll('{{footer}}', footer ?? '')
    .replaceAll('{{cta.label}}', cta.label)
    .replaceAll('{{cta.link}}', cta.link);
}
