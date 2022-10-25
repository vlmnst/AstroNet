export const getPromRate = (item) => {
    if (item.reviews.length === 0) return 0
    
    let score = item?.reviews?.map((ele) => {
        return ele.rating;
    });
    let total = score.reduce((a, b) => a + b, 0);
    total = total / score.length;
    return Math.floor(total)
}