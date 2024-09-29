# XAML-Inline-To-External-Style-Converter

This JavaScript tool helps developers convert XAML inline styles into reusable external styles. It can handle both complete XAML elements and individual style attributes, providing a clean and organized way to maintain UI styles.
Demo : 
Input:
<TextBlock Margin="5 5 5 5" FontSize="10" Background="Black">Hello world</TextBlock>

Output:

<Style x:Key="TextBlockStyle" TargetType="TextBlock">
    <Setter Property="Margin" Value="5 5 5 5"/>
    <Setter Property="FontSize" Value="10"/>
    <Setter Property="Background" Value="Black"/>
</Style>
