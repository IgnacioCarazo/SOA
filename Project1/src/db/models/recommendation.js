class Recommendation {
  
  constructor(place, genre, song) {
    this.place = place;
    this.genre = genre;
    this.song = song;
  }

  validate() {
    if (!this.place || !this.genre || !this.song) {
      throw new Error('Invalid recommendation');
    }
  }


  toObject() {
      return {
        place: this.place,
        genre: this.genre,
        song: this.song
      };
  }
}

module.exports = Recommendation;