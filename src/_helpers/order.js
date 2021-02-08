const sortArray = (arr, column, order)=> {
    let cmp;
    if (order == 'desc') {
        cmp = (a, b) =>{
            if ( a[column] < b[column] ){
              return -1;
            }
            if ( a[column] > b[column] ){
              return 1;
            }
            return 0;
          }
          
    } else {
        cmp = (a, b) =>{
          if ( a[column] > b[column] ){
            return -1;
          }
          if ( a[column] < b[column] ){
            return 1;
          }
          return 0;
        }
        
    }
  return arr = arr.slice().sort(cmp);
}

export default sortArray;