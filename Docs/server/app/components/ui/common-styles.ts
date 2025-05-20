export const commonStyles = {
    container: 'max-w-4xl mx-auto px-4 py-8',

    heading: {
        h1: 'text-3xl font-bold mb-8 text-gray-900 flex items-center gap-2',
        h2: 'text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2',
        h3: 'text-xl font-medium mb-2 text-gray-700 flex items-center gap-2',
    },

    text: {
        regular: 'text-base text-gray-600 leading-relaxed',
        small: 'text-sm text-gray-500',
    },

    card: 'bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 w-full md:w-auto',

    trustBadge: 'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium',

    button: {
        primary: 'bg-[#FF6B00] text-white px-6 py-2 rounded-lg hover:bg-[#E65000] transition-colors duration-200 w-full md:w-auto',
        secondary: 'bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 w-full md:w-auto',
    },

    input: 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent',

    analysisGrid: 'grid grid-cols-1 md:grid-cols-2 gap-6',
}; 