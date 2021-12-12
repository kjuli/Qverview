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
export interface Repository<T, ID = string> {
    /**
     * Finds the data by its id.
     * @param id The id of the data
     */
    findByID(id: ID): T | undefined;

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

    toString(): string {
        return this.name;
    }
}


export abstract class NameRepository<T extends Entity> implements Repository<T> {
    private cache: T[];

    get data(): T[] {
      if (this.cache !== null && this.cache !== undefined) {
        return this.cache;
      }

      this.cache = this.receiveData();
      return this.cache;
    }

    findByID(id: string): T | undefined {
      return this.data.find(value => value.name.toLowerCase() === id.toLowerCase());
    }

    protected abstract receiveData(): T[];

    /**
     * This is a synonym for {@link #findByID(string)}.
     *
     * @see #findByID(string)
     */
    findByName(name: string): T | undefined {
      return this.findByID(name);
    }
}
