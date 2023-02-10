import {MovieModel} from '../movies.model';

const model = new MovieModel();

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
    it('create method should add a movie', async () => {
        const result = await model.create({
        name: "Toy Story",
        release_date: new Date("2022-05-15 00:00.00")
        
    });
    console.log("result"+ result)
    expect(result).toEqual({
        id: 1,
        name: "Toy Story",
        release_date: new Date("2022-05-15 00:00.00")
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

  it('show method should return the correct movie', async () => {
    const result = await model.show("1");
    expect(result).toEqual({
        id: 1,
        name: "Toy Story",
        release_date: new Date("2022-05-15 00:00.00")
    });
  });

  it('delete method should remove the movie', async () => {
      model.delete("1");
    const result = await model.index()

    expect(result).toEqual([]);
  });
  
  // seed = 77278
})
