export class CreateBookDto {
  readonly title: string;
  readonly author: string;
  readonly ISBN?: string;
  readonly status: string;
}

export class UpdateBookDto {
  readonly title?: string;
  readonly author?: string;
  readonly ISBN?: string;
  readonly status?: string;
}
