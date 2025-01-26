import { ResponseList } from '../paginador/type/paginator.type';

export class Paginator {
  public static Format<T>(
    data: T[],
    count: number,
    page: number,
    limit: number,
  ): ResponseList<T> {
    const totalPages = Math.ceil(count / limit);

    return {
      totalPages,
      hasPrevPage: page > 1,
      hasNextPage: page < totalPages,
      page,
      limit,
      totalDocs: count,
      data,
    };
  }
}
