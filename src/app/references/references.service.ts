import { Injectable } from '@angular/core';
import REPOSITORY_STATE from '../repository/repositoryModel';
import {AuthorName, Authors, BibFilePresenter, parseBibFile} from 'bibtex';

@Injectable({
  providedIn: 'root'
})
export class ReferencesService {
  private _references: BibFilePresenter = null;

  constructor() {
    REPOSITORY_STATE.references.subscribe(value => {
      this._references = parseBibFile(value);
    });
  }

  public get references(): BibFilePresenter {
    if (this._references == null) {
      throw Error('The references somehow weren\'t loaded yet...');
    }
    return this._references;
  }

  /**
   * Returns an HTML string of a BIB-tex entry.
   *
   * @param entryId The id of the bibtex entry.
   */
  public getHtmlRepresentationOf(entryId: string): string {
    const entry = this._references.getEntry(entryId);
    const type = entry.type;
    let totalString;
    switch (type) {
      case 'article':
        totalString = `${this.getAuthorsList(entry.getAuthors())}. ${entry.title$}. ${entry.getFieldAsString('journal')}. ${entry.getFieldAsString('year')} ${entry.getFieldAsString('month')}; ${entry.getFieldAsString('volume')}: ${entry.getFieldAsString('pages')}. ${entry.getFieldAsString('note')}`;
    }
    totalString += ` url: <a href="${entry.getFieldAsString('url')}">${entry.getFieldAsString('url')}</a>`;
    totalString += ` DOI: <a href="https://doi.org/${entry.getFieldAsString('doi')}">${entry.getFieldAsString('doi')}</a>`;
    return totalString; // return empty string because no one cares...
  }

  private getAuthorsList(authors: Authors): string {
    let authorsAr: AuthorName[];
    let end = '';
    if (authors.authors$.length > 2) {
      authorsAr = authors.authors$.slice(0, 1);
      end = ' et al';
    } else {
      authorsAr = authors.authors$;
    }

    return authorsAr.map(value => value.lastNames.join('-') + value.lastNames[0][0]).join(',') + end;
  }
}
