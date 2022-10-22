  const myData = [
            {
                id: 1,
                parent_id: 0,
                title: 'Branch 1',
                description: '<p>Check out the <a href="http://api.jquery.com/text/" rel="noreferrer">text</a> method.</p>',
            },
            {
                id: 2,
                parent_id: 1,
                title: 'Branch 2',
                img: 'img/undraw_profile.svg'
            },
            {
                id: 3,
                parent_id: 2,
                title: 'Branch 3',
                description: 'Description of Branch 3',

            },
            {
                id: 4,
                parent_id: 3,
                title: 'Branch 4',
                description: '',

            },
            {
                id: 5,
                parent_id: 4,
                title: 'Branch 5',
                img: 'img/undraw_profile_1.svg',
                description: '<div class="comment-body js-comment-edit-hide">\nTest description</div>',

            },
            {
                id: 6,
                parent_id: 2,
                title: 'Branch 6',

            }, {
                id: 8,
                parent_id: 6,
                img: 'img/undraw_rocket.svg',
                title: 'Branch 8',
                description: '',

            },
            {
                id: 9,
                parent_id: 3,
                title: 'Branch 9',
                description: '',

            },
            {
                id: 7,
                img: 'img/undraw_posting_photo.svg',
                parent_id: 10,
                title: 'Branch 7',

            },

            {
                title: 'Branch 10',
                id: 10,
                parent_id: 9,
                description: '',

            },
        ];

        $(document).ready(function () {
            const input = {
                data: myData,// {}, myData
                options: {
                    modal: {
                        id: "#myModal",
                        ModalDelete: "#myModalDelete",
                        name: "#CatName",
                        description: "#CatDescId",
                        image: "#image"
                    },
                    maxLevel: 10,
                    dataAttributes: {
                        id: 'id__',
                        parent: 'parent__',
                    },
                    dataKeys: {
                        id: 'id',
                        parent: 'parent_id',
                        title: 'title',
                        description: 'description',
                        image: 'img'
                    },
                }
                
            }

            $("#tree").BsNestedSortable(input)//.serializeList()

        })