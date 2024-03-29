export function generateMicrofrontendLayout(data) {
  var lines = "<single-spa-router><main>";
  for (var singleSpaLink in data.imports) {
    lines = generateLine(lines, singleSpaLink, fetchLanguage(singleSpaLink));
  }
  lines += "</main></single-spa-router>";
  return lines;
}

function generateLine(lines, singleSpaLink, language) {
  if (singleSpaLink.includes("teiler-dashboard")) {
    let property = isDefaultLanguage(language)
      ? "default"
      : 'path="' + fetchRelativePath() + language + '"';
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

function fetchRelativePath() {
  let result = "";
  if (
    process.env.HTTP_RELATIVE_PATH &&
    process.env.HTTP_RELATIVE_PATH.length > 0
  ) {
    result =
      process.env.HTTP_RELATIVE_PATH[0] == "/"
        ? process.env.HTTP_RELATIVE_PATH.substring(1)
        : process.env.HTTP_RELATIVE_PATH;
    result += "/";
  }
  return result;
}
