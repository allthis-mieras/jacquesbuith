import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'textBlock',
  title: 'Text Block',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Block Title',
      type: 'string',
      validation: (Rule) => Rule.required().warning('A title is required'),
    }),
    defineField({
      name: 'textItems',
      title: 'Text Items',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Cols',
          fields: [
            defineField({
              name: 'column',
              title: 'Column',
              type: 'blockContent',
            }),
          ],
          preview: {
            select: {
              column: 'column',
            },
            prepare(selection) {
              const {column} = selection;
              const plainText = column ? column[0]?.children?.filter((child: any) => child._type === 'span')[0]?.text : 'Geen tekst';
              return {
                title: plainText || 'Lege Kolom',
                subtitle: 'Kolom',
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(3).warning('Je kunt maximaal 3 rich text-velden toevoegen.'), // Maximaal 3 rich text blokken
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      const {title} = selection;
      return {
        title: title || 'Leeg Tekstblok',
        subtitle: 'Text Block',
      };
    },
  },
});