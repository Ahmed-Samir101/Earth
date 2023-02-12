import {MovieModel} from '../movies.model';
import {UserListModule} from '../userList.model'

const model = new MovieModel();
const model2 = new UserListModule();

describe('Movies Model', ()=>{
    it('should have index', ()=>{
        expect(model.index).toBeDefined();
    })
    it('should have create', ()=>{
        expect(model.create).toBeDefined();
    })
    it('should have show', ()=>{
        expect(model.show).toBeDefined();
    }) 
    it('should have delete', ()=>{
        expect(model.delete).toBeDefined();
    })
    it('should have index', ()=>{
      expect(model2.index).toBeDefined();
  })
  it('should have create', ()=>{
      expect(model2.create).toBeDefined();
  })
  it('should have show', ()=>{
      expect(model2.show).toBeDefined();
  }) 
  it('should have delete', ()=>{
      expect(model2.delete).toBeDefined();
  })
  it('should have update', ()=>{
      expect(model2.update).toBeDefined();
  })
        it('create method should add a movie', async () => {
            const result = await model.create({
            name: "Toy Story",
            release_date: new Date("2022-05-15 00:00.00")
            
        });
        expect(result).toEqual({
            id: 1,
            name: "Toy Story",
            release_date: new Date("2022-05-15 00:00.00")
        });
      });
      it('create method should add a to the list', async () => {
          const result = await model2.create({
          user_id: 1,
          movie_id: 1
      });
      expect(result).toEqual({
          id: 1,
          user_id: '1',
          movie_id: '1'
      });
    });

  it('index method should return a list of movies', async () => {
      const result = await model.index();
    expect(result).toEqual([{
      id: 1,
      name: "Toy Story",
      release_date: new Date("2022-05-15 00:00.00")
    }]);
  });

  it('index method should return a list', async () => {
    const result = await model2.index();
    expect(result).not.toEqual([{
        id: 1,
        user_id: '1',
        movie_id: '1'
     }]);
  });

  it('show method should return the correct movie', async () => {
    const result = await model.show("1");
    expect(result).toEqual({
        id: 1,
        name: "Toy Story",
        release_date: new Date("2022-05-15 00:00.00")
    });
  });
  it('show method should return the correct list', async () => {
    const result = await model2.show("1");
    expect(result).toEqual({
        id: 1,
        user_id: '1',
        movie_id: '1'
    });
  });

  it('delete method should remove the movie', async () => {
      model2.delete2("1");
      model.delete("1");
    const result = await model.index()

    expect(result).toEqual([]);
  });
  it('delete method should remove the list of a user', async () => {
    model2.delete("1");
  const result = await model2.index()

  expect(result).toEqual([]);
});
  
})
