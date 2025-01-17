import { Meta, Story } from '@storybook/react'

import { Card, Grid, H2, H3 } from '@sourcegraph/wildcard'
import { BrandedStory } from '@sourcegraph/wildcard/src/stories'

import { RepoMetadataItem, RepoMetadata } from './RepoMetadata'

const config: Meta = {
    title: 'branded/search-ui/RepoMetadata',
    parameters: {
        chromatic: { viewports: [480] },
    },
}

export default config

const mockItems: RepoMetadataItem[] = [
    {
        key: 'archived',
        value: 'true',
    },
    {
        key: 'oss',
    },
    {
        key: 'license',
        value: 'multiple',
    },
]

export const RepoMetadataStory: Story = () => (
    <BrandedStory>
        {() => (
            <Card className="p-3">
                <Grid columnCount={3}>
                    <div />
                    <H2 className="mb-0 mr-3 text-no-wrap">small=false (default)</H2>
                    <H2 className="mb-0 mr-3 text-no-wrap">small=true</H2>

                    <H3 className="mb-0 mr-3 text-no-wrap">Default</H3>
                    <RepoMetadata items={mockItems} />
                    <RepoMetadata items={mockItems} small={true} />
                    <H3 className="mb-0 mr-3 text-no-wrap">Clickable</H3>
                    <RepoMetadata
                        items={mockItems}
                        queryState={{ query: '' }}
                        buildSearchURLQueryFromQueryState={() => ''}
                    />
                    <RepoMetadata
                        items={mockItems}
                        queryState={{ query: '' }}
                        buildSearchURLQueryFromQueryState={() => ''}
                        small={true}
                    />
                    <H3 className="mb-0 mr-3 text-no-wrap">Deletable</H3>
                    <RepoMetadata items={mockItems} onDelete={key => alert(key)} />
                    <RepoMetadata items={mockItems} onDelete={key => alert(key)} small={true} />
                </Grid>
            </Card>
        )}
    </BrandedStory>
)

RepoMetadataStory.storyName = 'RepoMetadata'
RepoMetadataStory.parameters = {
    chromatic: {
        disableSnapshot: false,
    },
}
