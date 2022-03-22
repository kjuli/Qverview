import {Authors, BibEntry} from "bibtex";

/**
 *
 */
export function getHTML(entry: BibEntry, type = "vancouver"): string {
  if (type !== 'vancouver') {
    throw new Error('Unsupported BibTex representation type: ' + type);
  }

  const url = entry.getFieldAsString("url");
  const doi = entry.getFieldAsString("doi");

  let result = "";

  if (url) {
    result += `URL: <a href="${url}">${url}</a> `;
  }

  if (doi) {
    result += `DOI: <a href="https://doi.org/${doi}">${doi}</a> `;
  }

  const author = representAuthors(entry.getAuthors());
  const title = entry.getFieldAsString("title");

  if (title) {
    result = `<strong>${title}</strong>. ` + result;
  }

  if (author) {
    result = author + ". " + result;
  }

  switch (entry.type) {
    case "article":
      result += addArticleField(entry);
      break;
    case "misc":
      result += addMisc(entry);
      break;
  }

  const note = entry.getFieldAsString("note");
  if (note) {
    result += note + ".";
  }

  return result;
}

function representAuthors(authors: Authors | undefined, max = 2): string | undefined {
  if (!authors) {
    return undefined;
  }

  let result = authors.authors$.slice(0, max)
    .map(value => value.lastNames[0] + " " +  value.firstNames[0][0] + ".")
    .join(", ");

  if (authors.authors$.length > max) {
    result += " et al";
  }

  return result;
}

function addArticleField(entry: BibEntry): string {
  const journalName = entry.getFieldAsString("journal");
  const year = entry.getFieldAsString("year");
  const month = entry.getFieldAsString("month");
  const date = entry.getFieldAsString("date");
  const volume = entry.getFieldAsString("volume");
  const number = entry.getFieldAsString("number");
  const pages = entry.getFieldAsString("pages");

  let result = "";

  if (journalName) {
    result += `<em>${journalName}</em>. `;
  }

  if (year) {
    result += year;
    if (month) {
      result += " " + month + ";";
    } else {
      result += ";";
    }
  } else if (date) {
    result += date + ";";
  }

  if (volume) {
    result += volume;
    if (number) {
      result += `(${number})`;
    }
  }

  if (pages) {
    result += ": " + pages + ". ";
  }

  return result;
}

function addMisc(entry: BibEntry): string {
  const howpublished = entry.getFieldAsString("howpublished");
  const year = entry.getFieldAsString("year");
  const month = entry.getFieldAsString("month");
  const date = entry.getFieldAsString("date");
  let result = "";
  result += getDate(year, month, date) + ". ";
  if (howpublished) {
    result += howpublished + ". ";
  }
  return result;
}

function getDate(year, month, date): string {
  if (year && month) {
    return `${year} ${month}.`;
  } else if (year) {
    return year;
  } else if (date) {
    return date;
  } else {
    return "";
  }
}
