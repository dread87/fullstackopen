const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.length === 0
        ? 0
        : blogs.reduce((likeCount, blog) => likeCount + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    return blogs.reduce((mostLikedBlog, blog) => {
        if (blog.likes > mostLikedBlog.likes) {
            return blog
        }
        else {
            return mostLikedBlog
        }
    }, blogs[0])
}

const mostBlogs = (blogs) => {
    if(blogs.length===0){
        return null
    }

    const counts = _.countBy(blogs, 'author');
    const mostFrequent = _.maxBy(_.keys(counts), (author) => counts[author])

    return {
        author: mostFrequent,
        blogs: counts[mostFrequent]
    }
}

const mostLikes = (blogs)=>{
    if(blogs.length===0){
        return null
    }

    const grouped = _.groupBy(blogs,'author');
    const sums = _.mapValues(grouped,(items)=>_.sumBy(items,'likes'))
    const authorWithMostLikes = _.maxBy(_.keys(sums),(author)=>sums[author])

    return {
        author: authorWithMostLikes,
        likes: sums[authorWithMostLikes]
    }

}
module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }