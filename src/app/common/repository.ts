/**
 * This interface describes a common definition of a repository.
 * In this way, data can be read, stored, saved, deleted and
 * created.
 *
 * The classes that implement this interface can provide further methods
 * for filtering the data.
 *
 * @param T The data type.
 * @param ID The type of the ID of the data. Defaults to string.
 */
import {BehaviorSubject, Observable, ReplaySubject, Subject} from 'rxjs';
import REPOSITORY_STATE from '../repository/repositoryModel';
import {TableModel} from '../generictable/table.model';

export interface Repository<T extends Entity, ID = string> {
    /**
     * Finds the data by its id.
     * @param id The id of the data
     */
    findByID(id: ID): T;

    /**
     * Returns the complete list of data.
     */
    data: T[];
}

/**
 * Every entity in our application has a property 'name'. Every object
 * instance of this type is therefore represented by this name.
 */
export abstract class Entity {
    /**
     * The unique name of the instance.
     */
    name: string;
    link?: string;
    references?: object;
    description?: string;
    isUndefined = false;

    /** Specifies to which table this entity belongs to. */
    tableModel?: TableModel<any>;

    toString(): string {
        if (this.isUndefined) {
          return `${this.name} (undefined)`;
        } else {
          return this.name;
        }
    }
}

export interface BaseDto {
    name: string;
    link?: string;
    _references?: object;
    description?: string;
}

/**
 * Each thing might have a reference. This is done in the data model.
 */
export type Reference<Base> = Base | {
    reference: {
        name ?: string;
        link: string;
    };
    data: Base;
};

export class UnknownEntity extends Entity {
  readonly isUndefined = true;

  constructor(public readonly name: string) {
    super();
  }
}

export abstract class NameRepository<T extends Entity> implements Repository<T> {
    private cache: T[];
    private observable: Subject<T[]> = new ReplaySubject<T[]>(1);

    constructor(private repositoryFilename?: string, convert?: (data: any) => T) {
      if (repositoryFilename && REPOSITORY_STATE[repositoryFilename] && convert) {
        REPOSITORY_STATE[repositoryFilename].subscribe(this.subscribeApiStr(convert));
      } else if (repositoryFilename && !REPOSITORY_STATE[repositoryFilename]) {
        console.log('wrong api state id: ' + repositoryFilename);
      }
    }

    private subscribeApiStr(convert: (data: any) => T): (value: any) => void {
      return value => {
        this.cache = value.map(convert);
        this.observable.next(this.cache);
      };
    }

    public asObservable(): Observable<T[]> {
      return this.observable.asObservable();
    }

    get data(): T[] {
      if (this.cache !== null && this.cache !== undefined) {
        return this.cache;
      }
      console.error("There is no data yet.");
      return [];
    }

    findByID(id: string): T {
      return show(this.data.find(value => value.name.toLowerCase() === id.toLowerCase()), id);
    }

    //protected abstract receiveData(): T[];

    /**
     * This is a synonym for {@link #findByID(string)}.
     *
     * @see #findByID(string)
     */
    findByName(name: string): T {
      return this.findByID(name);
    }
}

export abstract class SubscriberNamedRepository<T extends Entity, DTO> implements Repository<T> {

  private _observerData: Observable<DTO[]>;
  private observerCache = new Subject<T[]>();
  private cache: T[];
  protected readonly abstract converter: (dtos: DTO[]) => T[];

  constructor(private observable: Observable<DTO[]>) {
    this.observable.subscribe(value => this.cache = this.converter(value));
    this.observable.subscribe(value => this.observerCache.next(this.converter(value)));
  }

  public asObservable(): Observable<T[]> {
    return this.observerCache;
  }

  public get data(): T[] {
    return this.cache;
  }

  findByID(id: string): T {
    return show(this.cache.find(value => value.name.toLowerCase() === id.toLowerCase()), id);
  }

  /**
   * This is a synonym for {@link #findByID(string)}.
   *
   * @see #findByID(string)
   */
  findByName(name: string): T {
    return this.findByID(name);
  }
}

export function show<T extends Entity>(data: T, otherwise: string): T {
  if (data) {
    return data;
  } else {
    return new UnknownEntity(otherwise) as T;
  }
}
