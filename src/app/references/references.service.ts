import { Injectable } from '@angular/core';
import REPOSITORY_STATE from '../repository/repositoryModel';
import {AuthorName, Authors, BibFilePresenter, parseBibFile} from 'bibtex';
import {getHTML} from "./BibTexRepresentation";

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
    return getHTML(entry);
  }
}
