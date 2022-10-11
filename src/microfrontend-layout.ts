export function generateMicrofrontendLayout(data) {
  var lines = "<single-spa-router><main>";
  for (var singleSpaLink in data.imports) {
    lines = generateLine(lines, singleSpaLink, fetchLanguage(singleSpaLink));
  }
  lines += "</main></single-spa-router>";
  return lines;
}

function generateLine(lines, singleSpaLink, language) {
  if (singleSpaLink.includes("teiler-ui")) {
    let property = isDefaultLanguage(language)
      ? "default"
      : 'path="' + language + '"';
    lines += "<route " + property + ">";
    lines += "\t" + generateApplicationLine(singleSpaLink);
    lines += "</route>";
  }
  return lines;
}

function fetchLanguage(singleSpaLink) {
  let index1 = singleSpaLink.indexOf("/");
  let index2 = singleSpaLink.indexOf("/", index1 + 1);
  return singleSpaLink.substring(index1 + 1, index2);
}

function generateApplicationLine(singleSpaLink) {
  return '<application name="' + singleSpaLink + '"></application>';
}

function isDefaultLanguage(language) {
  return language === process.env.DEFAULT_LANGUAGE;
}
