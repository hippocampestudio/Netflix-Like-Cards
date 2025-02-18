import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InnerBlocks, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useRef } from '@wordpress/element';
import './style.scss';
import './editor.scss';
import './card';
import './lightbox';

// Enregistrement du bloc personnalisé
registerBlockType('create-block/netflix-like-cards', {
    title: 'Netflix-Like Cards',
    icon: 'format-gallery',
    category: 'hippocampe-studio',
    attributes: {
        carouselTitle: {
            type: 'string',
            default: '',
        },
    },
    edit: Edit,
    save: Save,
});

// Fonction d'édition du bloc
function Edit({ attributes, setAttributes }) {
    const blockProps = useBlockProps();
    const carouselRef = useRef(null);
    const { carouselTitle } = attributes;

    return (
        <>
            {/* Contrôles de l'inspecteur pour les réglages du carousel */}
            <InspectorControls>
                <PanelBody title={__('Réglages du carousel', 'netflix-like-cards')}>
                    <TextControl
                        __nextHasNoMarginBottom
                        label={__('Titre du carousel', 'netflix-like-cards')}
                        value={carouselTitle}
                        onChange={(value) => setAttributes({ carouselTitle: value })}
                    />
                </PanelBody>
            </InspectorControls>
            {/* Rendu du bloc dans l'éditeur */}
            <div {...blockProps}>
                {carouselTitle && <h2 className="netflix-like-carousel-title">{carouselTitle}</h2>}
                <div className="netflix-like-carousel" ref={carouselRef}>
                    <InnerBlocks
                        allowedBlocks={['create-block/netflix-card']}
                        orientation="horizontal"
                        renderAppender={() => <InnerBlocks.ButtonBlockAppender />}
                    />
                </div>
            </div>
        </>
    );
}

// Fonction de sauvegarde du bloc
function Save({ attributes }) {
    const blockProps = useBlockProps.save();
    const { carouselTitle } = attributes;

    return (
        <div {...blockProps}>
            {carouselTitle && <h2 className="netflix-like-carousel-title">{carouselTitle}</h2>}
            <div className="netflix-like-carousel">
                <InnerBlocks.Content />
            </div>
            {/* Boutons de navigation du carousel */}
            <button className="carousel-arrow left dashicons dashicons-arrow-left-alt2"></button>
            <button className="carousel-arrow right dashicons dashicons-arrow-right-alt2"></button>
        </div>
    );
}
