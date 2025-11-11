function BlogPost({ title, date, excerpt }: { title: string; date: string; excerpt: string }) {
  return (
    <article className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          {title}
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          {date}
        </p>
        <p className="text-gray-700 mb-4">
          {excerpt}
        </p>
        <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
          Read more &rarr;
        </a>
      </div>
    </article>
  );
}

export default BlogPost;