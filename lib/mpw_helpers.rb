# encoding: utf-8

module MpwHelpers
  def javascript_pack_tag(name)
    %(<script src="#{asset_path("#{name}.js")}" defer="defer"></script>)
  end

  def stylesheet_pack_tag(name)
    %(<link rel='stylesheet' href="#{asset_path("#{name}.css")}"></link>)
  end

  private

  def asset_path(name)
    public_manifest_path = File.expand_path File.join(
      File.dirname(__FILE__),
      '../.tmp/dist/manifest.json',
    )
    manifest_data = if File.exist?(public_manifest_path)
                      JSON.parse(File.read(public_manifest_path))
                    else
                      {}
                    end

    manifest_data[name.to_s]
  end
end
