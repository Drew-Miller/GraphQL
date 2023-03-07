import { distance, closest } from 'fastest-levenshtein';
import { Author, Book, SearchResult } from "../dto";

type SearchOptions = {
  sort: 'weight' | 'value'
};

const defaultSearchOptions: SearchOptions = {
  sort: 'weight'
};

export class Search {
  private results: SearchResult[] = [];

  constructor(private value: string, private options: SearchOptions = defaultSearchOptions) {}

  public addAuthors(items: Author[]): SearchResult[] {
    const results = items.map(item => {
      const itemValue = item.name;
      return {
        weight: this.weightResult(this.value, itemValue),
        value: itemValue,
        type: 'search'
      } as SearchResult
    });

    this.results.push(...results);
    return results;
  }

  public addBooks(items: Book[]): SearchResult[] {
    const results = items.map(item => {
      const itemValue = item.title;
      return {
        weight: this.weightResult(this.value, itemValue),
        value: itemValue,
        type: 'search',
        description: item.author.name
      } as SearchResult
    });

    this.results.push(...results);
    return results;
  }

  public getResults(): SearchResult[] {
    const results = this.sortResults(this.options, this.results);
    return results;
  }

  private weightResult(value: string, itemValue: string) {
    return distance(value, itemValue);
  }

  private sortResults(options: SearchOptions, results: SearchResult[]) {
    switch(options.sort) {
      // Weight sort
      default: {
        return results.sort((a, b) => a.weight < b.weight ? -1 : 1);
      }
    }
  }
}