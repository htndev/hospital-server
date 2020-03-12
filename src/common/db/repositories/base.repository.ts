import { DocumentType, mongoose } from '@typegoose/typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';

type PromiseDocument<T> = Promise<DocumentType<T>>
type PromiseDocumentsArray<T> = Promise<DocumentType<T>[]>

export abstract class BaseRepository<T> {
  protected constructor(protected model: ModelType<T>) {}

  protected async count() {
    return this.model.countDocuments({});
  }

  protected async create(item: DocumentType<T>): PromiseDocument<T> {
    return this.model.create(item);
  }

  protected async delete(id: string): PromiseDocument<T> {
    return this.model.findByIdAndRemove(this.toObjectId(id)).exec();
  }

  protected async update(item: DocumentType<T>): PromiseDocument<T> {
    return this.model.findByIdAndUpdate(item.id, item, { new: true }).exec();
  }

  protected async findAll(filter = {}, projection = null, options = null): PromiseDocumentsArray<T> {
    return this.model.find(filter, projection, options).exec();
  }

  protected async findOne(filter = {}, projection = null, options = null): PromiseDocument<T> {
    return this.model.findOne(filter, projection, options).exec();
  }

  protected async findById(id: string): PromiseDocument<T> {
    return this.model.findById(this.toObjectId(id)).exec();
  }

  protected async updateOne(filter = {}, doc: any): PromiseDocument<T> {
    return this.model.updateOne(filter, doc).exec();
  }

  protected async aggregate(pipeline: any): PromiseDocumentsArray<T> {
    return this.model.aggregate(pipeline).exec();
  }

  protected async clearCollection(filter = {}): Promise<void> {
    await this.model.deleteMany(filter).exec();
  }

  private toObjectId(id: string): mongoose.Types.ObjectId {
    return mongoose.Types.ObjectId(id);
  }
}
