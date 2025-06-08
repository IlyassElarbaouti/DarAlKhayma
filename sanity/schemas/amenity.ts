// Amenity schema for Sanity
export default {
  name: 'amenity',
  title: 'Amenity',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Emoji or icon name',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Basics', value: 'basics' },
          { title: 'Features', value: 'features' },
          { title: 'Location', value: 'location' },
          { title: 'Safety', value: 'safety' },
          { title: 'Entertainment', value: 'entertainment' }
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'icon'
    },
    prepare(selection: any) {
      const { title, subtitle, media } = selection
      return {
        title: `${media} ${title}`,
        subtitle: subtitle
      }
    }
  }
}
