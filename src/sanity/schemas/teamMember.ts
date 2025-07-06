import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'teamMember',
  title: 'Team Members',
  type: 'document',
  icon: () => '👤',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'role',
      title: 'Job Title/Role',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'image',
      title: 'Profile Photo',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required().min(20),
      description: 'Professional biography'
    }),
    defineField({
      name: 'tip',
      title: 'Local Tip',
      type: 'text',
      rows: 2,
      description: 'Personal recommendation or local insight'
    }),
    defineField({
      name: 'destination',
      title: 'Favorite Destination',
      type: 'string',
      description: 'Their favorite place in Morocco'
    }),
    defineField({
      name: 'items',
      title: 'Essential Items',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of items they always carry',
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'itemsDescription',
      title: 'Items Description',
      type: 'string',
      description: 'Brief explanation about their essential items'
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: Rule => Rule.email()
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string'
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media',
      type: 'object',
      fields: [
        defineField({
          name: 'linkedin',
          title: 'LinkedIn URL',
          type: 'url'
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url'
        }),
        defineField({
          name: 'twitter',
          title: 'Twitter URL',
          type: 'url'
        })
      ],
      options: {
        collapsible: true,
        collapsed: true
      }
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 0
    }),
    defineField({
      name: 'featured',
      title: 'Featured Team Member',
      type: 'boolean',
      description: 'Show prominently on about page',
      initialValue: false
    }),
    defineField({
      name: 'isActive',
      title: 'Active Team Member',
      type: 'boolean',
      description: 'Currently active team member',
      initialValue: true
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image'
    }
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' },
        { field: 'name', direction: 'asc' }
      ]
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }]
    },
    {
      title: 'Recently Added',
      name: 'createdDesc',
      by: [{ field: '_createdAt', direction: 'desc' }]
    }
  ]
})
