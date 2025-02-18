// Importation des dépendances nécessaires de WordPress
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls, MediaUpload, RichText } from '@wordpress/block-editor';
import { PanelBody, Button, ComboboxControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

// Enregistrement du bloc personnalisé 'Netflix Like Card'
registerBlockType('create-block/netflix-card', {
    title: 'Netflix Like Card',
    icon: 'format-image',
    parent: ['create-block/netflix-like-cards'],
    attributes: {
        title: { type: 'string', source: 'html', selector: 'h3' },
        description: { type: 'string', source: 'html', selector: 'p' },
        imageUrl: { type: 'string' },
        linkPostUrl: { type: 'string', default: '' },
    },
    edit: EditCard,
    save: SaveCard,
});

// Fonction d'édition du bloc
function EditCard({ attributes, setAttributes }) {
    const { title, description, imageUrl, linkPostUrl } = attributes;
    const blockProps = useBlockProps();

    // Récupération de tous les articles du site
    const allPosts = useSelect((select) => {
        const { getPostTypes, getEntityRecords } = select(coreStore);
        const postTypes = getPostTypes({ per_page: -1 })?.filter(
            ({ viewable, slug }) => viewable && !['attachment', 'wp_block'].includes(slug)
        ) || [];

        return postTypes.flatMap(type => 
            getEntityRecords('postType', type.slug, { per_page: -1, _fields: 'id,title,type,link' }) || []
        );
    }, []);

    // Création des options pour le sélecteur de lien
    const postOptions = allPosts.map(post => ({
        value: post.link,
        label: `${post.title.rendered} (${post.type})`
    }));

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Réglage de la carte', 'netflix-like-cards')}>
                    {/* Champs pour le titre */}
                    <fieldset>
                        <h2 className="blocks-base-control__label">{__('Titre', 'netflix-like-cards')}</h2>
                        <RichText
                            tagName="h2"
                            value={title}
                            onChange={(value) => setAttributes({ title: value })}
                            placeholder={__('Titre de la carte', 'netflix-like-cards')}
                        />
                    </fieldset>
                    {/* Champs pour la description */}
                    <fieldset>
                        <h2 className="blocks-base-control__label">{__('Description', 'netflix-like-cards')}</h2>
                        <RichText
                            tagName="p"
                            value={description}
                            onChange={(value) => setAttributes({ description: value })}
                            placeholder={__('Description de la carte', 'netflix-like-cards')}
                        />
                    </fieldset>
                    {/* Sélecteur d'image */}
                    <fieldset>
                        <h2 className="blocks-base-control__label">{__('Image', 'netflix-like-cards')}</h2>
                        <MediaUpload
                            onSelect={(media) => setAttributes({ imageUrl: media.url })}
                            allowedTypes={['image']}
                            value={imageUrl}
                            render={({ open }) => (
                                <Button onClick={open} isLarge isPrimary>
                                    {imageUrl ? __('Remplacer l\'image', 'netflix-like-cards') : __('Choisir une image', 'netflix-like-cards')}
                                </Button>
                            )}
                        />
                    </fieldset>
                    {/* Sélecteur de lien */}
                    <fieldset>
                        <h2 className="blocks-base-control__label">{__('Lien', 'netflix-like-cards')}</h2>
                        <ComboboxControl
                            __nextHasNoMarginBottom
                            value={linkPostUrl}
                            onChange={(value) => setAttributes({ linkPostUrl: value })}
                            options={postOptions}
                            onFilterValueChange={(inputValue) =>
                                postOptions.filter(option =>
                                    option.label.toLowerCase().includes(inputValue.toLowerCase())
                                )
                            }
                        />
                    </fieldset>
                </PanelBody>
            </InspectorControls>
            {/* Aperçu du bloc dans l'éditeur */}
            <div {...blockProps}>
                <div className="netflix-card">
                    {imageUrl && <img src={imageUrl} alt={title} />}
                    <div className="netflix-card-content">
                        <h3>{title}</h3>
                        <RichText.Content tagName="p" value={description} />
                    </div>
                </div>
            </div>
        </>
    );
}

// Fonction de sauvegarde du bloc
function SaveCard({ attributes }) {
    const { title, description, imageUrl, linkPostUrl } = attributes;
    const blockProps = useBlockProps.save();

    return (
        <div {...blockProps}>
            <a href={linkPostUrl} className="netflix-card">
                {imageUrl && <img src={imageUrl} alt={title} />}
                <div className="netflix-card-content">
                    <h3>{title}</h3>
                    <RichText.Content tagName="p" value={description} />
                </div>
            </a>
        </div>
    );
}
