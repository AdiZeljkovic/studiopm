import type { NewsletterDoc, RenderOptions, ServiceBlock } from "@/lib/newsletter/types";
import { serviceLimit, templates, type TemplateTheme } from "@/lib/newsletter/templates";

/**
 * Email HTML renderer.
 *
 * Output follows email-client constraints: 600px table layout, inline
 * styles, no external CSS or web fonts, PNG icons and logos, bulletproof
 * buttons, background images with a VML fallback for Outlook desktop, and
 * a small <style> block for mobile stacking (supported by Apple Mail,
 * Gmail apps and most modern clients).
 */

const SANS = "'Helvetica Neue',Helvetica,Arial,sans-serif";
const SERIF = "Georgia,'Times New Roman',Times,serif";
const WIDTH = 600;

const IVORY = "#f4efe8";
const SAND = "#e7d9c7";
const SAND_CARD = "#e4d6c3";

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const text = (value: string) => escapeHtml(value.trim()).replace(/\n/g, "<br>");
const attr = (value: string) => escapeHtml(value.trim());

/** Resolves a library id or URL to an absolute image URL sized for email (2x for retina). */
export function resolveImage(source: string, width: number, height: number, base: string): string {
  const value = source.trim();
  if (value.startsWith("unsplash:")) {
    const id = value.slice("unsplash:".length);
    return `https://images.unsplash.com/photo-${id}?fm=jpg&q=72&fit=crop&crop=entropy&w=${width * 2}&h=${height * 2}`;
  }
  if (value.startsWith("/")) return `${base.replace(/\/$/, "")}${value}`;
  return value;
}

const asset = (path: string, base: string) => `${base.replace(/\/$/, "")}${path}`;

interface ButtonStyle {
  bg?: string;
  color: string;
  border: string;
}

function button(label: string, url: string, style: ButtonStyle, align: "left" | "center" = "left") {
  if (!label.trim()) return "";
  return `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="${align}" style="border-collapse:separate;">
  <tr>
    <td ${style.bg ? `bgcolor="${style.bg}"` : ""} style="border:1px solid ${style.border};${style.bg ? `background:${style.bg};` : ""}">
      <a href="${attr(url || "#")}" target="_blank" style="display:inline-block;white-space:nowrap;padding:13px 22px;font-family:${SANS};font-size:11px;line-height:14px;letter-spacing:2px;text-transform:uppercase;color:${style.color};text-decoration:none;font-weight:600;">${text(label)}&nbsp;&nbsp;&rarr;</a>
    </td>
  </tr>
</table>`;
}

/** Table cell with a background image, readable fallback colour and VML for Outlook. */
function backgroundCell(opts: {
  image: string;
  width: number;
  height: number;
  color: string;
  gradient?: string;
  padding: string;
  inner: string;
  className?: string;
}) {
  const { image, width, height, color, gradient, padding, inner, className } = opts;
  const background = gradient ? `${gradient}, url('${image}')` : `url('${image}')`;
  return `
<td background="${image}" bgcolor="${color}" width="${width}" height="${height}" valign="top" class="${className ?? ""}"
  style="background-color:${color};background-image:${background};background-size:cover;background-position:center;background-repeat:no-repeat;">
  <!--[if gte mso 9]>
  <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:${width}px;height:${height}px;">
    <v:fill type="frame" src="${image}" color="${color}" />
    <v:textbox inset="0,0,0,0">
  <![endif]-->
  <div class="bg-inner" style="padding:${padding};">${inner}</div>
  <!--[if gte mso 9]></v:textbox></v:rect><![endif]-->
</td>`;
}

function smallCaps(value: string, color: string, extra = "") {
  if (!value.trim()) return "";
  return `<p style="margin:0;font-family:${SANS};font-size:10px;line-height:14px;letter-spacing:2.4px;text-transform:uppercase;color:${color};${extra}">${text(value)}</p>`;
}

function header(doc: NewsletterDoc, theme: TemplateTheme, base: string) {
  const logoFile =
    theme.logo === "ivory" ? "logo-ivory.png" : doc.logoStyle === "color" ? "logo-color.png" : "logo-ink.png";
  return `
<tr>
  <td bgcolor="${theme.headerBg}" style="background:${theme.headerBg};padding:34px 40px 26px 40px;" class="px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td valign="bottom" class="stack" style="padding:0;">
          <a href="${attr(doc.footer.websiteUrl)}" target="_blank"><img src="${asset(`/email-assets/${logoFile}`, base)}" width="172" height="51" alt="Studio PortMix" style="display:block;width:172px;height:auto;border:0;"></a>
        </td>
        <td valign="bottom" align="right" class="stack stack-left" style="padding:0 0 4px 0;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="right" class="stack-left">
            <tr><td style="border-top:1px solid ${theme.headerMuted};padding-top:10px;font-family:${SANS};font-size:9.5px;line-height:15px;letter-spacing:2px;text-transform:uppercase;color:${theme.headerMuted};text-align:right;" class="stack-left">${text(doc.header.tagline)}</td></tr>
          </table>
        </td>
      </tr>
    </table>
  </td>
</tr>`;
}

function footer(doc: NewsletterDoc, theme: TemplateTheme, base: string) {
  const logo = theme.footerLogo === "ivory" ? "logo-ivory.png" : doc.logoStyle === "color" ? "logo-color.png" : "logo-ink.png";
  const tone = theme.footerIcons;
  const row = (icon: string, content: string) =>
    content
      ? `<tr>
          <td width="22" valign="middle" style="padding:3px 10px 3px 0;"><img src="${asset(`/email-assets/icons/${icon}-${tone}.png`, base)}" width="14" height="14" alt="" style="display:block;width:14px;height:14px;border:0;"></td>
          <td valign="middle" style="padding:3px 0;font-family:${SANS};font-size:12px;line-height:18px;color:${theme.footerMuted};">${content}</td>
        </tr>`
      : "";
  const email = doc.footer.email.trim();
  const website = doc.footer.website.trim();
  return `
<tr>
  <td bgcolor="${theme.footerBg}" style="background:${theme.footerBg};padding:32px 40px 16px 40px;" class="px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td valign="middle" class="stack" style="padding:0 0 16px 0;">
          <img src="${asset(`/email-assets/${logo}`, base)}" width="128" height="38" alt="Studio PortMix" style="display:block;width:128px;height:auto;border:0;">
        </td>
        <td valign="middle" align="right" class="stack stack-left" style="padding:0 0 16px 0;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="right" class="stack-left">
            ${row("map-pin", text(doc.footer.location))}
            ${row("mail", email ? `<a href="mailto:${attr(email)}" style="color:${theme.footerMuted};text-decoration:none;">${text(email)}</a>` : "")}
            ${row("globe", website ? `<a href="${attr(doc.footer.websiteUrl)}" target="_blank" style="color:${theme.footerMuted};text-decoration:none;">${text(website)}</a>` : "")}
          </table>
        </td>
      </tr>
    </table>
  </td>
</tr>
<tr>
  <td bgcolor="${theme.footerBg}" style="background:${theme.footerBg};padding:0 40px 28px 40px;" class="px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="border-top:1px solid ${theme.footerLine};padding-top:16px;font-family:${SANS};font-size:10.5px;line-height:16px;color:${theme.footerMuted};">
          ${text(doc.footer.legal)}${doc.footer.unsubscribeLabel.trim() ? ` &nbsp;·&nbsp; <a href="${attr(doc.footer.unsubscribeUrl)}" style="color:${theme.footerMuted};text-decoration:underline;">${text(doc.footer.unsubscribeLabel)}</a>` : ""}
        </td>
      </tr>
    </table>
  </td>
</tr>`;
}

/* ---------------------------------------------------------------- Classique */

function classique(doc: NewsletterDoc, t: TemplateTheme, base: string) {
  const hero = backgroundCell({
    image: resolveImage(doc.hero.image, WIDTH, 420, base),
    width: WIDTH,
    height: 420,
    color: "#2a2420",
    gradient: "linear-gradient(90deg, rgba(24,20,17,0.82) 0%, rgba(24,20,17,0.55) 48%, rgba(24,20,17,0.05) 100%)",
    padding: "70px 40px 56px 40px",
    className: "hero",
    inner: `
      <table role="presentation" width="330" cellpadding="0" cellspacing="0" border="0" class="full">
        <tr><td style="padding:0 0 22px 0;"><div style="width:24px;height:1px;background:${IVORY};line-height:1px;font-size:1px;">&nbsp;</div></td></tr>
        <tr><td class="h1" style="font-family:${SANS};font-size:36px;line-height:40px;font-weight:300;color:${IVORY};letter-spacing:-0.5px;">${text(doc.hero.title)}</td></tr>
        ${doc.hero.text.trim() ? `<tr><td style="padding:14px 0 0 0;font-family:${SANS};font-size:15px;line-height:22px;font-weight:300;color:${IVORY};">${text(doc.hero.text)}</td></tr>` : ""}
        <tr><td style="padding:28px 0 0 0;">${button(doc.hero.ctaLabel, doc.hero.ctaUrl, { color: IVORY, border: IVORY })}</td></tr>
      </table>`,
  });

  const items = doc.services.items.slice(0, serviceLimit.classique);
  const cell = (s: ServiceBlock | undefined, side: "left" | "right") =>
    s
      ? `<td width="50%" valign="top" class="stack cell" style="padding:18px ${side === "left" ? "20px" : "0"} 18px ${side === "right" ? "20px" : "0"};${side === "right" ? `border-left:1px solid ${t.line};` : ""}">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
            <td width="52" valign="top" style="padding:2px 14px 0 0;"><img src="${asset(`/email-assets/icons/${s.icon}-ink.png`, base)}" width="36" height="36" alt="" style="display:block;width:36px;height:36px;border:0;"></td>
            <td valign="top">
              <p style="margin:0;font-family:${SANS};font-size:13.5px;line-height:18px;font-weight:600;color:${t.ink};">${text(s.title)}</p>
              ${s.text.trim() ? `<p style="margin:6px 0 0 0;font-family:${SANS};font-size:12px;line-height:17px;color:${t.muted};">${text(s.text)}</p>` : ""}
            </td>
          </tr></table>
        </td>`
      : `<td width="50%" class="stack" style="padding:0;${side === "right" ? `border-left:1px solid ${t.line};` : ""}">&nbsp;</td>`;
  const rows: string[] = [];
  for (let i = 0; i < items.length; i += 2) rows.push(`<tr>${cell(items[i], "left")}${cell(items[i + 1], "right")}</tr>`);

  const feature = `
<tr>
  <td bgcolor="${t.body}" style="background:${t.body};padding:8px 24px 32px 24px;" class="px-sm">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
      ${backgroundCell({
        image: resolveImage(doc.feature.image, 552, 300, base),
        width: 552,
        height: 300,
        color: "#3a322c",
        padding: "34px 24px 34px 24px",
        className: "feature",
        inner: `
          <table role="presentation" width="300" cellpadding="0" cellspacing="0" border="0" class="full" bgcolor="#2a2420" style="background:#2a2420;">
            <tr><td style="padding:28px 30px 30px 30px;">
              ${smallCaps(doc.feature.label, "#cfc5b8", "margin-bottom:12px;")}
              <p style="margin:0;font-family:${SANS};font-size:21px;line-height:27px;font-weight:300;color:${IVORY};">${text(doc.feature.title)}</p>
              ${doc.feature.ctaLabel.trim() ? `<div style="padding-top:20px;">${button(doc.feature.ctaLabel, doc.feature.ctaUrl, { color: IVORY, border: IVORY })}</div>` : ""}
            </td></tr>
          </table>`,
      })}
    </tr></table>
  </td>
</tr>`;

  return `
${header(doc, t, base)}
<tr>${hero}</tr>
<tr>
  <td bgcolor="${t.body}" style="background:${t.body};padding:40px 40px 20px 40px;" class="px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr><td style="padding:0 0 14px 0;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
          <td width="34" style="padding-right:12px;"><div style="width:34px;height:1px;background:${t.muted};line-height:1px;font-size:1px;">&nbsp;</div></td>
          <td>${smallCaps(doc.services.title, t.muted)}</td>
        </tr></table>
      </td></tr>
    </table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rows.join("")}</table>
  </td>
</tr>
${feature}
${footer(doc, t, base)}`;
}

/* --------------------------------------------------------------------- Nuit */

function nuit(doc: NewsletterDoc, t: TemplateTheme, base: string) {
  const hero = backgroundCell({
    image: resolveImage(doc.hero.image, WIDTH, 400, base),
    width: WIDTH,
    height: 400,
    color: "#2b2420",
    gradient: "linear-gradient(90deg, rgba(30,25,22,0.80) 0%, rgba(30,25,22,0.45) 55%, rgba(30,25,22,0.15) 100%)",
    padding: "54px 40px 50px 40px",
    className: "hero",
    inner: `
      <table role="presentation" width="380" cellpadding="0" cellspacing="0" border="0" class="full">
        ${doc.hero.kicker.trim() ? `<tr><td style="padding:0 0 18px 0;">${smallCaps(doc.hero.kicker, IVORY)}</td></tr>` : ""}
        <tr><td class="h1" style="font-family:${SANS};font-size:40px;line-height:44px;font-weight:300;color:${IVORY};letter-spacing:-0.5px;">${text(doc.hero.title)}</td></tr>
        ${doc.hero.text.trim() ? `<tr><td style="padding:14px 0 0 0;font-family:${SANS};font-size:14px;line-height:21px;color:${IVORY};">${text(doc.hero.text)}</td></tr>` : ""}
        <tr><td style="padding:26px 0 0 0;">${button(doc.hero.ctaLabel, doc.hero.ctaUrl, { bg: SAND, color: t.ink, border: SAND })}</td></tr>
      </table>`,
  });

  const items = doc.services.items.slice(0, serviceLimit.nuit);
  const colWidth = Math.floor((WIDTH - 80) / Math.max(items.length, 1));
  const cols = items
    .map(
      (s, i) => `
      <td width="${colWidth}" valign="top" class="stack cell" style="padding:0 ${i < items.length - 1 ? "14px" : "0"} 24px ${i > 0 ? "14px" : "0"};${i > 0 ? `border-left:1px solid ${t.line};` : ""}">
        <p style="margin:0;font-family:${SERIF};font-size:22px;line-height:26px;color:${t.muted};">${String(i + 1).padStart(2, "0")}</p>
        <p style="margin:8px 0 14px 0;font-family:${SANS};font-size:13.5px;line-height:18px;color:${t.ink};min-height:36px;">${text(s.title)}</p>
        <img src="${resolveImage(s.image, colWidth - 28, 124, base)}" width="${colWidth - 28}" height="124" alt="" class="img-wide" style="display:block;width:${colWidth - 28}px;height:124px;object-fit:cover;border:0;">
        ${s.text.trim() ? `<p style="margin:14px 0 0 0;font-family:${SANS};font-size:11.5px;line-height:17px;color:${t.muted};">${text(s.text)}</p>` : ""}
      </td>`,
    )
    .join("");

  const closing = `
<tr>
  <td bgcolor="${t.footerBg}" style="background:${t.footerBg};padding:0;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
      <td valign="middle" class="stack" style="padding:40px 30px 40px 40px;">
        ${doc.feature.label.trim() ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
          <td width="30" style="padding-right:12px;"><div style="width:30px;height:1px;background:#b9ae9f;line-height:1px;font-size:1px;">&nbsp;</div></td>
          <td style="font-family:${SANS};font-size:11px;line-height:14px;color:#cfc5b8;">${text(doc.feature.label)}</td>
        </tr></table>` : ""}
        <p style="margin:18px 0 0 0;font-family:${SERIF};font-size:24px;line-height:31px;color:${IVORY};">${text(doc.feature.title)}</p>
        ${doc.feature.ctaLabel.trim() ? `<div style="padding-top:22px;">${button(doc.feature.ctaLabel, doc.feature.ctaUrl, { color: IVORY, border: IVORY })}</div>` : ""}
      </td>
      <td width="220" valign="top" class="stack" style="padding:0;">
        <img src="${resolveImage(doc.feature.image, 220, 250, base)}" width="220" height="250" alt="" class="img-full" style="display:block;width:220px;height:250px;object-fit:cover;border:0;">
      </td>
    </tr></table>
  </td>
</tr>
<tr><td bgcolor="${t.footerBg}" style="background:${t.footerBg};padding:0 40px;" class="px"><div style="border-top:1px solid ${t.footerLine};height:1px;line-height:1px;font-size:1px;">&nbsp;</div></td></tr>`;

  return `
${header(doc, t, base)}
<tr>${hero}</tr>
<tr>
  <td bgcolor="${t.body}" style="background:${t.body};padding:40px 40px 36px 40px;" class="px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
      <td valign="middle" class="stack" style="padding:0 20px 18px 0;font-family:${SERIF};font-size:26px;line-height:32px;color:${t.ink};">${text(doc.services.title)}</td>
      ${doc.services.intro.trim() ? `<td width="210" valign="middle" class="stack" style="padding:0 0 18px 16px;border-left:1px solid ${t.line};font-family:${SANS};font-size:11.5px;line-height:17px;color:${t.muted};">${text(doc.services.intro)}</td>` : ""}
    </tr></table>
    <div style="border-top:1px solid ${t.line};height:1px;line-height:1px;font-size:1px;margin:6px 0 24px 0;">&nbsp;</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>${cols}</tr></table>
    ${doc.services.ctaLabel.trim() ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="padding-top:12px;">${button(doc.services.ctaLabel, doc.services.ctaUrl, { color: t.ink, border: t.ink }, "center")}</td></tr></table>` : ""}
  </td>
</tr>
${closing}
${footer(doc, t, base)}`;
}

/* -------------------------------------------------------------------- Sable */

function sable(doc: NewsletterDoc, t: TemplateTheme, base: string) {
  const hero = backgroundCell({
    image: resolveImage(doc.hero.image, WIDTH, 400, base),
    width: WIDTH,
    height: 400,
    color: "#e9dfd1",
    gradient: "linear-gradient(90deg, rgba(243,237,228,0.94) 0%, rgba(243,237,228,0.78) 50%, rgba(243,237,228,0.10) 100%)",
    padding: "60px 40px 50px 40px",
    className: "hero",
    inner: `
      <table role="presentation" width="360" cellpadding="0" cellspacing="0" border="0" class="full">
        ${doc.hero.kicker.trim() ? `<tr><td style="padding:0 0 18px 0;">${smallCaps(doc.hero.kicker, t.muted)}</td></tr>` : ""}
        <tr><td class="h1" style="font-family:${SANS};font-size:34px;line-height:38px;font-weight:300;color:${t.ink};letter-spacing:-0.5px;">${text(doc.hero.title)}</td></tr>
        ${doc.hero.text.trim() ? `<tr><td style="padding:14px 0 0 0;font-family:${SANS};font-size:14px;line-height:21px;color:${t.muted};">${text(doc.hero.text)}</td></tr>` : ""}
        <tr><td style="padding:26px 0 0 0;">${button(doc.hero.ctaLabel, doc.hero.ctaUrl, { bg: t.ink, color: IVORY, border: t.ink })}</td></tr>
      </table>`,
  });

  const items = doc.services.items.slice(0, serviceLimit.sable);
  const rows: string[] = [];
  for (let i = 0; i < items.length; i += 3) {
    const row = [0, 1, 2]
      .map((k) => {
        const s = items[i + k];
        return `<td width="33%" valign="top" align="center" class="stack cell" style="padding:20px 12px 22px 12px;${k > 0 ? `border-left:1px solid ${t.line};` : ""}">
          ${s ? `<img src="${asset(`/email-assets/icons/${s.icon}-ink.png`, base)}" width="40" height="40" alt="" style="display:block;margin:0 auto;width:40px;height:40px;border:0;">
          <p style="margin:12px 0 0 0;font-family:${SANS};font-size:13px;line-height:18px;color:${t.ink};text-align:center;">${text(s.title)}</p>` : "&nbsp;"}
        </td>`;
      })
      .join("");
    rows.push(`<tr>${row}</tr>`);
  }

  const feature = backgroundCell({
    image: resolveImage(doc.feature.image, WIDTH, 320, base),
    width: WIDTH,
    height: 320,
    color: "#b9a891",
    padding: "36px 40px 36px 24px",
    className: "feature",
    inner: `
      <table role="presentation" width="300" cellpadding="0" cellspacing="0" border="0" class="full" bgcolor="${SAND_CARD}" style="background:${SAND_CARD};">
        <tr><td style="padding:28px 28px 30px 28px;">
          ${smallCaps(doc.feature.label, t.muted, "margin-bottom:12px;")}
          <p style="margin:0;font-family:${SANS};font-size:23px;line-height:28px;font-weight:300;color:${t.ink};">${text(doc.feature.title)}</p>
          ${doc.feature.text.trim() ? `<p style="margin:10px 0 0 0;font-family:${SANS};font-size:12px;line-height:18px;color:${t.muted};">${text(doc.feature.text)}</p>` : ""}
          ${doc.feature.ctaLabel.trim() ? `<div style="padding-top:20px;">${button(doc.feature.ctaLabel, doc.feature.ctaUrl, { color: t.ink, border: t.ink })}</div>` : ""}
        </td></tr>
      </table>`,
  });

  return `
${header(doc, t, base)}
<tr>${hero}</tr>
<tr>
  <td bgcolor="${t.body}" style="background:${t.body};padding:22px 28px 26px 28px;" class="px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rows.join("")}</table>
  </td>
</tr>
<tr>${feature}</tr>
${footer(doc, t, base)}`;
}

/* ------------------------------------------------------------------ Document */

export function renderNewsletter(doc: NewsletterDoc, options: RenderOptions): string {
  const t = templates[doc.template];
  const base = options.assetBase;
  const body = doc.template === "nuit" ? nuit(doc, t, base) : doc.template === "sable" ? sable(doc, t, base) : classique(doc, t, base);
  const preheaderPad = "&#847;&zwnj;&nbsp;".repeat(60);

  return `<!DOCTYPE html>
<html lang="${doc.locale}" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light only">
<title>${attr(doc.subject)}</title>
<!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
<style>
  body { margin:0; padding:0; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
  table { border-collapse:collapse; mso-table-lspace:0; mso-table-rspace:0; }
  img { border:0; outline:none; text-decoration:none; -ms-interpolation-mode:bicubic; }
  a { text-decoration:none; }
  @media only screen and (max-width: 620px) {
    .container { width:100% !important; }
    .stack { display:block !important; width:100% !important; box-sizing:border-box; border-left:0 !important; }
    .stack-left { float:none !important; text-align:left !important; align:left !important; }
    .px { padding-left:24px !important; padding-right:24px !important; }
    .px-sm { padding-left:12px !important; padding-right:12px !important; }
    .full { width:100% !important; }
    .cell { padding-left:0 !important; padding-right:0 !important; }
    .h1 { font-size:30px !important; line-height:34px !important; }
    .bg-inner { padding-left:24px !important; padding-right:24px !important; }
    .img-full { width:100% !important; height:auto !important; }
    .img-wide { width:100% !important; height:180px !important; object-fit:cover; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:${t.page};">
<div style="display:none;max-height:0;max-width:0;overflow:hidden;opacity:0;mso-hide:all;font-size:1px;line-height:1px;color:${t.page};">${text(doc.preheader)}${preheaderPad}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${t.page}" style="background:${t.page};">
  <tr>
    <td align="center" style="padding:24px 10px;">
      <!--[if mso]><table role="presentation" width="${WIDTH}" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
      <table role="presentation" class="container" width="${WIDTH}" cellpadding="0" cellspacing="0" border="0" style="width:${WIDTH}px;max-width:${WIDTH}px;">
        ${body}
      </table>
      <!--[if mso]></td></tr></table><![endif]-->
    </td>
  </tr>
</table>
</body>
</html>`;
}
